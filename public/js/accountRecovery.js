//const { usersCollection } = require('./app.js');

document.getElementById('recovery-type').addEventListener('change', function(event) {
 
let typeToDisplay = document.getElementById('recovery-type-selected').value; // Check the value of the dropdown to determine our logic and displays.

console.log(typeToDisplay);

if (typeToDisplay === 'clean') {

  console.log('DEBUG: Wiping containers.')

  let passwordContainer = document.getElementById('recovery-container-password');
  let emailContainer = document.getElementById('recovery-container-email')

  passwordContainer.style.display = 'none';
  emailContainer.style.display = 'none';

} else if (typeToDisplay === 'password') { // This Else contains the logic for handling changing the users password.

console.log('DEBUG: Displaying password recovery forms')

 let emailContainer = document.getElementById('recovery-container-email')
 emailContainer.style.display = 'none'; // Clear the email form if it's already open.

let container = document.getElementById('recovery-container-password'); 
container.style.display = 'block'; // Grab the container and display it.

// ------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('password-change-form').addEventListener('submit', async function() {
  

  
  event.preventDefault();

    var newPassword = await sha256(document.getElementById('new-password-input').value.trim());
    var confirmNewPassword = await sha256(document.getElementById('confirm-new-password-input').value.trim());
  
    console.log(`DEBUG: ${newPassword}`);
    console.log(`DEBUG: ${confirmNewPassword}`);

    if(newPassword != confirmNewPassword)
    {
      console.log('Password mismatch.')
      return;
    }

    console.log('DEBUG: Form submitted');
    document.getElementById('password-change-form').submit(); // Submit the form.

})

// ----------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('email-change-form').addEventListener('submit', async function() {

  event.preventDefault();

  var passwordToCheck = await sha256(document.getElementById('password-input').value.trim());

  var passwordToCheckAgainst = await usersCollection.find();

  //if ()

  console.log('DEBUG: Form submitted.');
  document.getElementById('email-change-form').submit(); // Submit the form.
})




} else if (typeToDisplay === 'email') {

console.log('DEBUG: Displaying email recovery forms')

let passwordContainer = document.getElementById('recovery-container-password');
passwordContainer.style.display = 'none'; // Clear the password form if it's already open.

let container = document.getElementById('recovery-container-email'); 
container.style.display = 'block'; // Grab the container and display it.

}
});
  