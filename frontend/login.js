document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Retrieve username and password entered by the user
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Check if the username and password are correct
    if (username === "user" && password === "password") {
      // Redirect the user to the home page
      window.location.href = "home.html";
    } else {
      // Display error message if username or password is incorrect
      document.getElementById("errorMessage").innerText = "Invalid username or password.";
    }
  });
  