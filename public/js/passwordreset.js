document.getElementById('resetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('emailInput').value;
  
    // Simulate reset process (replace this with actual reset process)
    // For demonstration, it just shows a message
    document.getElementById('message').textContent = 'Password reset instructions sent to ' + email;
  });
  