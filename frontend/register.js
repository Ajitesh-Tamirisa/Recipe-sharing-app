document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const bio = document.getElementById("bio").value;
    const allergyInfo = Array.from(document.getElementById("allergy-info").selectedOptions).map(option => parseInt(option.value));
    const interestedCategory = Array.from(document.getElementById("interested-category").selectedOptions).map(option => parseInt(option.value));

    const userData = {
      name: name,
      email: email,
      password: password,
      bio: bio,
      allergies: allergyInfo,
      categories: interestedCategory
    };
    console.log(userData);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
      redirect: "follow"
    };

    fetch("http://localhost:8080/api/user/register", requestOptions)
      .then(response => {
        console.log(response);
        if (response.ok) {
          // document.getElementById("successMessage").style.display = "block";
          alert("User successfully registered");
          window.location.href = "login.html";
          // Clear form fields
          // document.getElementById("registrationForm").reset();
        } else {
          return response.json(); // Return the error response
        }
      })
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error);
        }
      })
      .catch(error => console.error(error));
  });