// Middleware declarations

const express = require("express");
// const path = require("path");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodyParser = require("body-parser");


// MongoDB declarations

const { MongoClient } = require("mongodb");
const uri = 'mongodb+srv://admin:cytravelapp@cluster0.e2ggebk.mongodb.net/';
const client = new MongoClient(uri);

const userSchema = new Schema ({
name: String,
email: String,
password: String // Password must be hashed.
});

let usersCollection;

async function ConnectToMongoDB() {
    try {
        await client.connect();
        const database = client.db('users');
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

async function StartServer(){
    try{
        await ConnectToMongoDB();

        // ALL ROUTES SHOULD GO HERE

        // GET declarations

        app.get("/", (req, res)=> {
            res.render(`index`);
        });

        app.get("/register", (req, res) =>{
            res.render(`signupPage`);
        });

        app.get("/passwordreset", (req, res)=>{
            res.render(`passwordreset.ejs`)
        })
        // POST declarations

        app.post("/register", async (req, res) => {
            // TODO: Make this more robust by requiring a strong password, then hash the password to store in the database securely.
            try {
                const { name, email, password } = req.body; 
        
                const cursor = await usersCollection.find({ email: email });
        
                const result = await cursor.toArray();
                
                if (result.length > 0) {
                    console.log("Email already exists, redirecting user back to the login page.");
                    res.status(409).redirect("/login");
                } else {
                    const resultToInsert = await usersCollection.insertOne({
                        name: name,
                        email: email,
                        password: password
                    });
                    console.log(`User ${name} inserted into the database successfully under id ${resultToInsert.insertedId}, redirecting user to homepage.`);
                    res.status(200).redirect("/");
                }
            } catch (error) {
                console.error("Error writing to database, registration unsuccessful. Reason: ", error);
                res.status(500).send("An error occurred while registering the user.");
            }
        });
        
        app.post("/login", async (req, res) => {
            try {
                // Pull the login form data from our request body.
                const { emaillogin, passwordlogin } = req.body;

                // Find documents matching the query. MongoDB returns .find() objects as a cursor which must be converted into an array.
                const cursor = usersCollection.find({ email: emaillogin });
                
                // Convert the cursor to an array of documents
                const result = await cursor.toArray();
                
                // If the length of our result is greater than 0, the email was found in usersCollection.
                if (result.length > 0) {
                    console.log('User found:', result);
                    
                    const user = result[0]; // This should only ever return one result in the index so we are asking for the first result.
                    const pass = user.password; // Set the password to match, to the password stored in the database for that particular user.

                    // DEBUGGING
                    console.log(pass) 
                    console.log(passwordlogin)

                    // Perform further authentication logic here.

                    if(passwordlogin === pass) {
                        console.log("Passwords are matching, logging user in.")
                        res.status(200).redirect("/");
                    }
                    else{
                        console.log("Passwords are not matching, redirect the user back to the login page.")
                        res.status(404).redirect("/login");
                    }
                } else {
                    console.log('Email not found, redirecting the user back to the login page.');
                    // Display error codes appropriate to the error ie wrong password, no email etc.
                    res.status(404).redirect("/login");
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).redirect("/");
            }
        });
        
        app.listen(port, () => {
            console.log(`Server started successfully. Listening on port: ${port}`)
        });

    } catch (err){
        console.error("Error starting server: ", err);
    }
}


StartServer();

/* 
NOTES (Kyal) : the variables 'passwordlogin' and 'emaillogin' only need to be exclusively identified because both registration 
and login forms exist on the same page at the moment. If they are moved the identifiers can also be removed and simplified.
*/



