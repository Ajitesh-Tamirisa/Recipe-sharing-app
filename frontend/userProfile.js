document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    const formFields = document.querySelectorAll("#profileForm input, #profileForm textarea");

    const userId = localStorage.getItem("userId");

    fetchUserRecipes();

    function fetchUserRecipes() {
      console.log("fetching user recipes");

      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch("http://localhost:8080/api/recipes/getUserRecipes/"+userId, requestOptions)
        .then((response) => response.json())
        .then((result) => {
              console.log(result);
              const userRecipes = document.getElementById('userRecipes');
              if(result.length === 0){
                userRecipes.innerHTML += "<p>Your recipes will appear here</p>";
              }
              else{
                userRecipes.innerHTML = '<h2>Your Recipes</h2>';
                result.forEach(recipe => {
                  userRecipes.innerHTML += `
                  <div class="card">
                    <div class="card-body text-center">
                      <h4 style="color:black">${recipe.title}</h4>
                      <h6 class="card-subtitle mb-2 text-muted">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</h6>
                      <img src="${recipe.image1Url}" class="img-fluid rounded-circle" style="object-fit: cover; width: 250px; height: 250px;" alt="Image"><br/>
                      <h5 class="card-text">${recipe.description}</h5>
                      <h5><a href="./recipePage.html?id=${recipe.recipeId}" class="card-link">View Recipe</a></h5>
                    </div>
                  </div>`;
                });
              }
        })
        .catch((error) => console.error(error));
    }
  
    // Function to enable editing of form fields
    function enableEditing() {
      formFields.forEach(field => {
        field.removeAttribute("readonly");
      });
      editButton.style.display = "none";
      saveButton.style.display = "block";
    }
  
    // Function to disable editing of form fields
    function disableEditing() {
      formFields.forEach(field => {
        field.setAttribute("readonly", true);
      });
      editButton.style.display = "block";
      saveButton.style.display = "none";
    }
  
    // Event listener for the edit button
    editButton.addEventListener("click", function() {
      enableEditing();
    });
  
    // Event listener for the save button
    saveButton.addEventListener("click", function() {
      disableEditing();
      // Logic to save changes (send data to server or update database) can be added here
    });
  
    // Initially disable editing of form fields
    disableEditing();
  });
  