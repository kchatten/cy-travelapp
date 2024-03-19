import { sha256 } from './sha256.js';

export function InitializeLoginLogic() { // Function to initialize registration logic on demand.

    document.getElementById('login-form').addEventListener('submit', async function (event) { // Add an event listener to our Registration Form, it must be asynchronous to support the sha256 hashing.

        console.log('DEBUG: Submitting form.')

        event.preventDefault(); // Prevent the default form submission behavior initially
    
        // Grab the values we wish to send as form data.
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim(); 
        const hashedPassword = await sha256(password);
    
        // Construct the form data into a JSON object.
        const formData = {
            email: email,
            password: hashedPassword, // Hash the password and send it to the server. This means the password that the user inputs never leaves this script unencrypted.
        };
    
        const errorMessage = document.getElementById('error-message'); // Grab the div to display any error messages.
        errorMessage.textContent = ''; // Clear previous error messages
        errorMessage.style.color = 'red'; // Set the color.
    
        if (!email || !password) { // Check that all fields have inputs.
            errorMessage.textContent = 'Please fill out all fields.';
        } else {    // Form is valid, proceed with submission

            // Create a new POST request using XMLHttpRequest(); NOTE: This can be used to grab multiple datatypes and is not restricted to XML.
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/login', true); // Open a new request, it is a POST request to the path '/register' and confirm that we want it to run asynchronously.
            xhr.setRequestHeader('Content-Type', 'application/json'); // Set the headers.
            xhr.onload = function () { // Define what we want to happen when this request loads based on the response code we send back.
                if (xhr.status === 200) { 
                    // TODO: Add logic for a successful request here (this will likely be firing the UpdateContainerLogin() function to direct the user to log in with their newly created account.)
                
                    let response = JSON.parse(xhr.responseText);
                    let token = response.token;
                    localStorage.setItem('token', token);
                    console.log(`Token ${token} received from the server, storing in localStorage...`);
                    
                    // Temporarily repurpose the error message div to display a success message. TODO: Remove this when the /login route is setup.

                    errorMessage.style.color = ''; // Reset the color.
                    errorMessage.textContent = ''; // Reset the text content.

                    errorMessage.style.color = '#000'; // Set the color.
                    errorMessage.textContent = 'Logged in!'; // Set the text content.

                } else if (xhr.status === 409) {
                    errorMessage.style.color = 'red';
                    errorMessage.textContent = 'No accounts with those credentials exist.'; // When we recieve a 409 conflict error indicating the user is attempting to register with an email that already exists within the database.
                } else {
                    errorMessage.textContent = 'Unhandled error'; // When we recieve any response that is not a success (200) or an expected duplicate email conflict error (409). If this message ever is displayed, further investigation is required.
                }
            };
            var jsonData = JSON.stringify(formData); // Convert formData to JSON string
            console.log('DEBUG (user information json object from registration.js): ', jsonData);
            xhr.send(jsonData); // Send the stringified JSON data as our request.
        }
    });
}