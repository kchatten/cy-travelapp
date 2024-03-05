document.addEventListener('DOMContentLoaded', function() {
  console.log("Attaching EventListener to Form");

  document.getElementById('signup-form').addEventListener('submit', function(event) {
      console.log('Form submitted');

      event.preventDefault(); // Prevent the default form submission behavior initially

      // Include the sha256.js script before using the sha256 function
      var script = document.createElement('script');
      script.src = '/js/sha256.js';
      document.head.appendChild(script);

      script.onload = function() {
          console.log("sha256.js loaded");

          // Now you can use the sha256 function to hash the password
          var name = document.getElementById('name').value.trim();
          var email = document.getElementById('email').value.trim();
          var password = document.getElementById('password').value.trim(); // Get the password as is
          var hashedPassword = sha256(password); // Hash the password
          var location = document.getElementById('location').value.trim();
          var errorMessage = document.getElementById('error-message');

          if (!name || !email || !password || !location) {
              errorMessage.textContent = 'Please fill out all fields.';
          } else if (!isValidEmail(email)) {
              errorMessage.textContent = 'Please enter a valid email address.';
          } else if (password.length < 8) {
              errorMessage.textContent = 'Password too short, minimum 8 characters.';
          } else if (!/\d/.test(password)) { // Check if the password contains at least one digit
              errorMessage.textContent = 'Password must contain at least one number.';
          } else if (!/[!@#$%^&*]/.test(password)) {
              errorMessage.textContent = 'Password must contain at least one special character (!@#$%^&*-+= etc).';
          } else {
              // Form is valid, proceed with submission
              errorMessage.textContent = '';
              // Update the form field with the hashed password
              document.getElementById('password').value = hashedPassword;
              // Now submit the form
              document.getElementById('signup-form').submit();
          }
      };
  });
});

function isValidEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}