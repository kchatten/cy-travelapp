// Middleware declarations

const express = require("express");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const token_key = "a1B2c3D4e5F6g7H8i9J10k11L12m13N14o15P16q17R18s19T20u21V22w23X24y25Z26"

// MongoDB declarations

const { MongoClient } = require("mongodb");
const uri = 'mongodb+srv://admin:cytravelapp@cluster0.e2ggebk.mongodb.net/';
const client = new MongoClient(uri);

const userSchema = new Schema({
    name: String,
    email: String,
    password: String // Password must be hashed.
});

let usersCollection;

async function ConnectToMongoDB() {
    try {
        await client.connect();
        const database = client.db('cyta');
        usersCollection = database.collection('users');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// SERVER declarations

const app = express();
const port = 3000;

// SET declarations

app.set(`view engine`, `ejs`);

// USE declarations

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TO ENSURE ALL ROUTES CAN ESTABLISH CORRECTLY WE MUST WAIT FOR MONGODB TO ESTABLISH.

async function StartServer() {
    try {
        await ConnectToMongoDB();

        // ALL ROUTES SHOULD GO HERE

        // GET declarations

        app.get("/", (req, res) => {
            res.render(`index`);
        });


        // POST declarations

        app.post("/register", async (req, res) => { // This request is sent from registration.js
            try {
                const { name, email, password, location } = req.body; // At this path we are expecting a name, an email, a sha256 hashed password and a location.

                const cursor = await usersCollection.find({ email: email }); // Compare the email from our request against our database. This returns a cursor.
                const result = await cursor.toArray(); // To access the values within the cursor we must turn it into an array.
        
                if (result.length > 0) { // If the length of our result is greater than 0, that indicates that we have found a matching email.
                    console.log("Email already exists");
                    return res.status(409).send('An account with that email already exists.'); // Send a conflict error status code with the appropriate error message we wish to display to the user.
                } else { // The length of result is 0 which indicates there are no matching emails in our database.
                  
                    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {   // Use bcrypt to hash the password of our request. Store that hashed result as the hashedPassword variable.
                        if (err) { // Handle the error gracefully.
                            console.error("Error hashing password:", err);
                            return res.status(500).send("An error occurred while hashing the password."); // This should never happen, it indicates a critical error with the bcrypt module. Ensure that bcrypt is up to date and appropriately required at the top of this script, that saltRounds is appropriately defined and that the password variable is correctly being passed from registration.js as a sha256 string.
                        }      
                        try { // Attempt to write to our database.
                            const resultToInsert = await usersCollection.insertOne({ // Debugging information, technically we can remove 'const resultToInsert = await' and just run the mongosh command collName.insertOne to insert the information into the database.
                                name: name,
                                email: email,
                                password: hashedPassword,
                                location: location
                            });
                            console.log(`DEBUG: User ${name} inserted into the database successfully under id ${resultToInsert.insertedId} with the following inputs: ${name}, ${email}, ${password}, ${hashedPassword}, ${location}`);
                            res.status(200).send(); // Send n empty body to complete the request. 
                        } catch (error) {
                            console.error("Error writing to database, registration unsuccessful. Reason:", error);
                            res.status(500).send("An error occurred while registering the user."); // The only error we should experience is a 500 internal error which is a result of an error connecting to our database.
                        }
                    });
                }
            } catch (error) {
                console.error("Error registering user:", error);
                res.status(500).send("An error occurred while registering the user.");
            }
        });
        

        app.post("/login", async (req, res) => { 
            try{
                const { email, password } = req.body; // Pull the login form data from our request body.
                const cursor = usersCollection.find({ email: email }); // Find documents matching the query. MongoDB returns .find() objects as a cursor which must be converted into an array.        
                const result = await cursor.toArray(); // Convert the cursor to an array of documents

                // If the length of our result is greater than 0, the email was found in usersCollection.
                if (result.length > 0) {
                    console.log('User found:', result);
                    
                    const user = result[0]; // This should only ever return one result in the index so we are asking for the first result.
                    console.log(user);
                    const passwordToCheckAgainst = user.password; // Set the password to match, to the password stored in the database for that particular user.

                    // DEBUGGING
                    console.log(passwordToCheckAgainst)
                    console.log(password)

                    // Perform further authentication logic here.

                    bcrypt.compare(password, passwordToCheckAgainst, function (err, results) {
                        if (err) {
                            console.log("DEBUG: Error in password comparison at app.js: ", err);
                            res.status(500).send();
                        }
                        if (results) {
                            // To add more information to the payload (the token) access them through the earlier declared 'user' variable.
                            let userName = user.name;
                            let userLocation = user.location;
                            let userId =  user._id.toString();
                            console.log(userId);

                            const token = jwt.sign({userId: userId, name: userName, email: email, location: userLocation }, `${token_key}`, { expiresIn: '1h' });
                            res.status(200).json({ token: token });
                            console.log("DEBUG: Passwords matching!");
                        } else {
                            console.log("DEBUG: Passwords do not match, reject user.");
                            res.status(409).send();
                        }
                    })
                } else {
                    console.log('No user with that email exists.');
                    res.status(404).send();
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send();
            }
        });
        
        // app.put("/accountrecovery/changepassword", (req, res) => {

        //     const { oldPassword, newPassword } = req.body;

        // });

        // app.put("/accountrecovery/changeemail", (req, res) => { TODO AFTER LOGIN IS SETUP

        //     const { oldEmail, newEmail } = req.body;

        // });

        app.listen(port, () => {
            console.log(`Server started successfully. Listening on port: ${port}`)
        });

    } catch (err) {
        console.error("Error starting server: ", err);
    }
}

StartServer();

// Functions related to JWT verification.

function VerifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, `${token_key}`, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is invalid' });
        }
        req.user = decoded;
        next();
    });
}





module.exports.usersCollection = usersCollection;
