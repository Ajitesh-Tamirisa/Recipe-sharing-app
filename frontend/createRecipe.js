document.getElementById("createRecipeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    const title = document.getElementById("title").value;
    const cookingTime = document.getElementById("cookingTime").value;
    const description = document.getElementById("description").value;
    // const imageInput = document.getElementById("image");
    // const imageFile = imageInput.files[0];
    const allergyInfo = Array.from(document.getElementById("allergy-info").selectedOptions).map(option => parseInt(option.value));
    const category = Array.from(document.getElementById("category").selectedOptions).map(option => parseInt(option.value));
    const userId = localStorage.getItem("userId");

    const recipeData = {
        title: title,
        //cookingTime: cookingTime,
        description: description,
        userId: userId, 
        image: "www.exampleimage.com/exampleimage", // Include the image URL in the recipe data
        allergies: allergyInfo,
        categories: category 
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeData),
        redirect: "follow"
    };

    fetch("http://localhost:8080/api/recipes/create", requestOptions)
        .then(response => {
        console.log(response);
        if (response.ok) {
          // document.getElementById("successMessage").style.display = "block";
          alert("Recipe Created Successfully");
          window.location.href = "createRecipe.html";
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
