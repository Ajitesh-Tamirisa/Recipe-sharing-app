const userId = localStorage.getItem("userId"); 
const userName = localStorage.getItem("name");
const recipeId = sessionStorage.getItem("recipeId");

$(document).ready(function(){
    let recipeId = getRecipeIdFromUrl();
    reviewList.innerHTML = "";
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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptionsNew = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("http://localhost:8080/review/recipe/"+recipeId, requestOptionsNew)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        let reviewList = document.getElementById("reviewList");
        if(result.length === 0){
            reviewList.innerHTML = "<p>No reviews yet.</p>";
        }
        else{
            result.forEach(review => {
                reviewList.innerHTML += `<li class="list-group-item my-2">
                <div style="display: flex; align-items: center;">
                    <img src="images/user.png" alt="User Profile Picture" class="mr-2" style="width: 40px; height: 40px; border-radius: 50%;">
                    <h5 id="reviwerName">${review.reviewerName}</h5>
                    <span id="rating" class="pt-2 mr-2 pr-2" style="position: absolute; top: 0; right: 0;">${Math.floor(review.rating)} stars</span>
                </div><br/>                         
                <p id="review">${review.review}</p>
            </li>`
            })
        }
    })
    .catch((error) => console.error(error));
})

function getRecipeIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.get('id'))
    return urlParams.get('id');
  }

