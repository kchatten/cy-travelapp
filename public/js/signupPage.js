document.getElementById('signup-form').addEventListener('submit', function(event) {
    var fullname = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var location = document.getElementById('location').value.trim();
    var errorMessage = document.getElementById('error-message');
  
    if (!fullname || !email || !password || !location) {
      errorMessage.textContent = 'Please fill out all fields.';
      event.preventDefault();
    } else if (!isValidEmail(email)) {
      errorMessage.textContent = 'Please enter a valid email address.';
      event.preventDefault();
    } else {
      // Form is valid, proceed with submission
      errorMessage.textContent = '';
    }
  });
  
  function isValidEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }