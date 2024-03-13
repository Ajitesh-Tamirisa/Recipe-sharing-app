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
                    <div id="${recipe.recipeId}" class="card-body text-center">
                      <h4 style="color:black" id="${recipe.recipeId+"-title"}" contentEditable = "false">${recipe.title}</h4>
                      <h6 class="card-subtitle mb-2 text-muted">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</h6>
                      <p id="${recipe.recipeId+"-cookingTime"}" style="position: absolute; top: 10px; right: 10px; background-color: rgba(255, 255, 255, 0.5); padding: 5px;">Cooking Time: ${recipe.cookingTime} mins</p>
                      <img src="${recipe.image1Url}" class="img-fluid rounded-circle" style="object-fit: cover; width: 250px; height: 250px;" alt="Image"><br/>
                      <h5  id="${recipe.recipeId+"-description"}" class="card-text" contentEditable = "false">${recipe.description}</h5>
                      <button id="${recipe.recipeId+"-edit"}" class="btn btn-primary float-right" onclick="editRecipe(${recipe.recipeId})">Edit</button>
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
  
  function editRecipe(recipeId) {
    let titleElement = document.getElementById(recipeId + "-title");
    let descriptionElement = document.getElementById(recipeId + "-description");
    let cookingTimeElement = document.getElementById(recipeId + "-cookingTime");
    let editButtonElement = document.getElementById(recipeId + "-edit");

    if (titleElement.contentEditable === "false") {
        editButtonElement.innerText = "Save";
        titleElement.contentEditable = "true";
        cookingTimeElement.contentEditable = "true";
        descriptionElement.contentEditable = "true";
    } else {
        editButtonElement.innerText = "Edit";
        titleElement.contentEditable = "false";
        descriptionElement.contentEditable = "false";
        cookingTimeElement.contentEditable = "false";
        // Save the changes or update the recipe details
        saveChanges(recipeId, titleElement.innerText, descriptionElement.innerText, cookingTimeElement.innerText);
    }
}


function saveChanges(recipeId, title, description, cookingTimeString) {
  // Implement logic to save the changes to the recipe with the given recipeId
  // For example, you can make a fetch request to update the recipe details

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let match = cookingTimeString.match(/\d+/);

  // Extract the number from the matched string
  let cookingTime = match ? parseInt(match[0]) : 0;

  const raw = JSON.stringify({
    "recipeId": recipeId,
    "title": title,
    "description": description,
    "cookingTime": cookingTime
  });
  console.log(raw);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/api/recipes/edit/"+recipeId, requestOptions)
    .then((response) => {
      console.log(response.text());
          if (!response.ok || response.status!=200) {
          alert('A network error occured. Please try again later');
          location.reload();
      }
      console.log('Response status code:', response.status);
      if(response.status === 200){
          alert("Recipe updated successfully!");
          location.reload()
      }
      return response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}