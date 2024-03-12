$(document).ready(function() {
    let currentUrl = window.location.href;
    let urlParams = new URLSearchParams(currentUrl.split('?')[1]);
    let searchQuery = urlParams.get('query');
    console.log(searchQuery);

    let searchResults = document.getElementById("searchResults");
    let originalResults = [];

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/api/recipes/search?query=" + searchQuery, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            originalResults = result;
            displayRecipes(originalResults);
        })
        .catch((error) => console.error(error));

    $("#filterCookingTime, #filterRating, #sort").change(function() {
        let filteredResults = originalResults.slice();
        let cookingTimeFilter = $("#filterCookingTime").val();
        let ratingFilter = $("#filterRating").val();
        let sortOption = $("#sort").val();

        if (cookingTimeFilter !== "all") {
            let cookingTime = cookingTimeFilter.split("-");
            filteredResults = filteredResults.filter(recipe => recipe.cookingTime == parseInt(cookingTime));
        }

        if (ratingFilter !== "all") {
            filteredResults = filteredResults.filter(recipe => recipe.averageRating >= parseInt(ratingFilter));
        }

        if (sortOption === "ratingDesc") {
            filteredResults.sort((a, b) => b.averageRating - a.averageRating);
        } else if (sortOption === "ratingAsc") {
            filteredResults.sort((a, b) => a.averageRating - b.averageRating);
        } else if (sortOption === "cookingTimeAsc") {
            filteredResults.sort((a, b) => a.cookingTime - b.cookingTime);
        } else if (sortOption === "cookingTimeDesc") {
            filteredResults.sort((a, b) => b.cookingTime - a.cookingTime);
        }

        displayRecipes(filteredResults);
    });

    function displayRecipes(recipes) {
        searchResults.innerHTML = "";
        if (recipes.length === 0) {
            searchResults.innerHTML = "<p>No results to display</p>";
        } else {
            recipes.forEach(recipe => {
                searchResults.innerHTML += `
                    <div class="card m-2">
                        <div class="card-body text-center">
                            <h4 style="color:black">${recipe.title}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">Average Rating: ${recipe.averageRating.toFixed(2)} (${recipe.ratingCount} ratings)</h6>
                            <p style="position: absolute; top: 10px; right: 10px; background-color: rgba(255, 255, 255, 0.5); padding: 5px;">Cooking Time: ${recipe.cookingTime} mins</p>
                            <img src="${recipe.image1Url}" class="img-fluid rounded-circle" style="object-fit: cover; width: 250px; height: 250px;" alt="Image"><br/>
                            <p class="card-text">${recipe.description}</p>
                            <h7><a href="./recipePage.html?id=${recipe.recipeId}" class="card-link">View Recipe</a></h7>
                        </div>
                    </div>`;
            });
        }
    }
});

function navigateToSearchPage(event){
    event.preventDefault();
    let queryString = document.getElementById("searchInput").value;
  
    let searchUrl = `search.html?query=${encodeURIComponent(queryString)}`;
    console.log(searchUrl);
    
    window.location.href = searchUrl;
  }