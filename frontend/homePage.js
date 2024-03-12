// Retrieve user information from local storage
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId"); 
const userName = localStorage.getItem("name");

$(document).ready(function() {

  $('a[href="#popular"]').tab('show');

  // Event listener for tab clicks
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href"); // Get the target tab id
      if (target === "#popular") {
          fetchPopularRecipes();
      } else if (target === "#dietaryPreferences") {
          fetchDietaryPreferenceRecipes();
      } else if (target === "#interests") {
          fetchInterestBasedRecipes();
      }
  });
});

// Function to fetch data for Home tab
function fetchPopularRecipes() {
  console.log("popular");
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://localhost:8080/home/popular", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          const popularContent = document.getElementById('popular');
          // popularContent.innerHTML = '<h2>Popular Recipes</h2>';
          result.forEach(recipe => {
            popularContent.innerHTML += `
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
        })
        .catch((error) => console.error(error));
}

// Repeat the above function for other tabs (Menu 1, Menu 2, Menu 3) with their respective API endpoints and content updates

function fetchDietaryPreferenceRecipes() {
  console.log("Dietary Preferences");
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch('http://localhost:8080/home/allergy/'+userId)
        .then(response => response.json())
        .then(data => {
          const dietaryPreferenceContent = document.getElementById('dietaryPreferences');
          // dietaryPreferenceContent.innerHTML = '<h2>Recipes based on your Dietary Preferences</h2>';
          data.forEach(recipe => {
            dietaryPreferenceContent.innerHTML += `
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
        });
}

function fetchInterestBasedRecipes() {
  console.log("Interests");
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://localhost:8080/home/category/"+userId, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const dietaryPreferenceContent = document.getElementById('interests');
          // dietaryPreferenceContent.innerHTML = '<h2>Recipes based on your Interests</h2>';
          data.forEach(recipe => {
            dietaryPreferenceContent.innerHTML += `
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
        });
}

function navigateToSearchPage(event){
  event.preventDefault();
  let queryString = document.getElementById("searchInput").value;

  let searchUrl = `search.html?query=${encodeURIComponent(queryString)}`;
  console.log(searchUrl);
  
  window.location.href = searchUrl;
}