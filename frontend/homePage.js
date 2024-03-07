// Retrieve user information from local storage
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId"); 
const userName = localStorage.getItem("name");

$(document).ready(function() {
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
          popularContent.innerHTML = '<h2>Popular Recipes</h2>';
          result.forEach(recipe => {
            popularContent.innerHTML += `
            <div class="card">
              <div class="card-body text-center">
                <h4 style="color:black">${recipe.title}</h4>
                <h6 class="card-subtitle mb-2 text-muted">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</h6>
                <img src="${recipe.image1Url}" class="img-fluid rounded-circle" style="object-fit: cover; width: 250px; height: 250px;" alt="Image"><br/>
                <h5 class="card-text">${recipe.description}</h5>
                <h5><a href="#" class="card-link">View Recipe</a></h5>
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
          dietaryPreferenceContent.innerHTML = '<h2>Recipes based on your Dietary Preferences</h2>';
          data.forEach(recipe => {
            dietaryPreferenceContent.innerHTML += `
            <div class="card">
              <div class="card-body">
                <h4 style="color:black">${recipe.title}</h4>
                <h6 class="card-subtitle mb-2 text-muted">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</h6>
                <h5 class="card-text">${recipe.description}</h5>
                <h5><a href="#" class="card-link">View Recipe</a><h5>
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
          dietaryPreferenceContent.innerHTML = '<h2>Recipes based on your Interests</h2>';
          data.forEach(recipe => {
            dietaryPreferenceContent.innerHTML += `
            <div class="card">
              <div class="card-body">
                <h4 style="color:black">${recipe.title}</h4>
                <h6 class="card-subtitle mb-2 text-muted">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</h6>
                <h5 class="card-text">${recipe.description}</h5>
                <h5><a href="#" class="card-link">View Recipe</a></h5>
              </div>
            </div>`;
          });
        });
}


// $(document).ready(function(){

//   fetch("http://localhost:8080/home/popular", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           const popularContent = document.getElementById('popular');
//           popularContent.innerHTML = '<h2>Popular Recipes</h2>';
//           result.forEach(recipe => {
//             popularContent.innerHTML += `
//             <div class="custom-block bg-white shadow-lg recipe-info card">
//               <a href="">
//                 <div class="d-flex">
//                   <div>
//                     <h5 class="mb-2">${recipe.title}</h5>
//                     <p class="mb-0">${recipe.description}</p>
//                     <p class="mb-0">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</p>
//                   </div>
//                 </div>
//                 <img src="${recipe.image}" class="custom-block-image img-fluid card-img" alt="">
//               </a>
//             </div>`;
//           });
//         })
//         .catch((error) => console.error(error));

//         fetch('http://localhost:8080/home/allergy/'+userId)
//         .then(response => response.json())
//         .then(data => {
//           const dietaryPreferenceContent = document.getElementById('dietaryPreferences');
//           dietaryPreferenceContent.innerHTML = '<h2>Recipes based on Dietary Preference</h2>';
//           data.forEach(recipe => {
//             dietaryPreferenceContent.innerHTML += `
//             <div class="custom-block bg-white shadow-lg recipe-info">
//               <a href="">
//                 <div class="d-flex">
//                   <div>
//                     <h5 class="mb-2">${recipe.name}</h5>
//                     <p class="mb-0">${recipe.description}</p>
//                     <p class="mb-0">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</p>
//                   </div>
//                 </div>
//                 <img src="${recipe.image}" class="custom-block-image img-fluid" alt="">
//               </a>
//             </div>`;
//           });
//         });

//         fetch('http://localhost:8080/home/category/'+userId)
//         .then(response => response.json())
//         .then(data => {
//           const interestsContent = document.getElementById('interests');
//           interestsContent.innerHTML = '<h2>Recipes based on Interests</h2>';
//           data.forEach(recipe => {
//             interestsContent.innerHTML += `
//             <div class="custom-block bg-white shadow-lg recipe-info">
//               <a href="">
//                 <div class="d-flex">
//                   <div>
//                     <h5 class="mb-2">${recipe.name}</h5>
//                     <p class="mb-0">${recipe.description}</p>
//                     <p class="mb-0">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</p>
//                   </div>
//                 </div>
//                 <img src="${recipe.image}" class="custom-block-image img-fluid" alt="">
//               </a>
//             </div>`;
//           });
//         });

//   $('#myTab a').on('click', function (e) {
//     e.preventDefault();
//     $(this).tab('show');

//     const tabId = $(this).attr('href');

//     if (tabId === "#popular") {
//       fetch("http://localhost:8080/home/popular", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           const popularContent = document.getElementById('popular');
//           popularContent.innerHTML = '<h2>Popular Recipes</h2>';
//           result.forEach(recipe => {
//             popularContent.innerHTML += `
//             <div class="custom-block bg-white shadow-lg recipe-info card">
//               <a href="">
//                 <div class="d-flex">
//                   <div>
//                     <h5 class="mb-2">${recipe.title}</h5>
//                     <p class="mb-0">${recipe.description}</p>
//                     <p class="mb-0">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</p>
//                   </div>
//                 </div>
//                 <img src="${recipe.image}" class="custom-block-image img-fluid card-img" alt="">
//               </a>
//             </div>`;
//           });
//         })
//         .catch((error) => console.error(error));
//     } else if (tabId === "#dietary-preference") {
//       fetch('http://localhost:8080/home/allergy/'+userId)
//         .then(response => response.json())
//         .then(data => {
//           const dietaryPreferenceContent = document.getElementById('dietaryPreferences');
//           dietaryPreferenceContent.innerHTML = '<h2>Recipes based on Dietary Preference</h2>';
//           data.forEach(recipe => {
//             dietaryPreferenceContent.innerHTML += `
//             <div class="custom-block bg-white shadow-lg recipe-info">
//               <a href="">
//                 <div class="d-flex">
//                   <div>
//                     <h5 class="mb-2">${recipe.name}</h5>
//                     <p class="mb-0">${recipe.description}</p>
//                     <p class="mb-0">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</p>
//                   </div>
//                 </div>
//                 <img src="${recipe.image}" class="custom-block-image img-fluid" alt="">
//               </a>
//             </div>`;
//           });
//         });
//     } else if (tabId === "#interests") {
//       fetch('http://localhost:8080/home/category/'+userId)
//         .then(response => response.json())
//         .then(data => {
//           const interestsContent = document.getElementById('interests');
//           interestsContent.innerHTML = '<h2>Recipes based on Interests</h2>';
//           data.forEach(recipe => {
//             interestsContent.innerHTML += `
//             <div class="custom-block bg-white shadow-lg recipe-info">
//               <a href="">
//                 <div class="d-flex">
//                   <div>
//                     <h5 class="mb-2">${recipe.name}</h5>
//                     <p class="mb-0">${recipe.description}</p>
//                     <p class="mb-0">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</p>
//                   </div>
//                 </div>
//                 <img src="${recipe.image}" class="custom-block-image img-fluid" alt="">
//               </a>
//             </div>`;
//           });
//         });
//     }
//   });
// });
