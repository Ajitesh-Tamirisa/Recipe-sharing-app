document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Retrieve email and password entered by the user
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Construct the JSON object
    const data = JSON.stringify({
        "email": email,
        "password": password
    });

    // Set up fetch options
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    };

    // Send the login request
    fetch("http://localhost:8080/auth/login", requestOptions)
        .then(response => {
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(result => {
            // Check if the token is received
            if (result && result.token) {
                // Store token, user ID, and name in local storage
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.userId);
                localStorage.setItem("name", result.name);

                // Redirect the user to the home page
                window.location.href = "homePage.html";
            } else {
                // Display error message if authentication fails
                document.getElementById("errorMessage").innerText = "Invalid email or password.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("errorMessage").innerText = "An error occurred. Please try again later.";
        });
});
