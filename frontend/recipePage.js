const userId = localStorage.getItem("userId"); 
const userName = localStorage.getItem("name");
const recipeId = sessionStorage.getItem("recipeId");

$(document).ready(function(){
    let recipeId = getRecipeIdFromUrl();
    console.log(recipeId);
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
      
    fetch("http://localhost:8080/api/recipes/getRecipeDetails/"+recipeId, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        document.getElementById("recipeName").innerHTML = result.title;
        document.getElementById("recipeDescription").innerHTML = result.description;
        document.getElementById("avgRating").innerHTML = `Average Rating: ${result.averageRating.toFixed(2)} (${result.ratingCount} ratings)`;
        document.getElementById("recipeImage").innerHTML = `<img src="${result.image1Url}" class="img-fluid rounded-circle" style="object-fit: cover; width: 350px; height: 350px;" alt="Image"><br/>`;
        document.getElementById("cookingTime").innerHTML = "Cooking Time: "+result.cookingTime+" minutes";
    })
    .catch((error) => console.error(error));
})

function getRecipeIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.get('id'))
    return urlParams.get('id');
  }

