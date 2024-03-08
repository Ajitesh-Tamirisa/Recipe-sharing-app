// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtX6iJMMDsqQc_kSBYvEZNTFDf9uMgxVE",
  authDomain: "recipe-app-14310.firebaseapp.com",
  projectId: "recipe-app-14310",
  storageBucket: "recipe-app-14310.appspot.com",
  messagingSenderId: "184105468371",
  appId: "1:184105468371:web:30a319bca5f0c69d43af26",
  measurementId: "G-9JYV4Q2G2Z"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

document.getElementById("createRecipeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    uploadImageAndCreateRecipe();
});

function uploadImageAndCreateRecipe() {
  const imageInput = document.getElementById("image");
  const imageFile = imageInput.files[0];
  const storageRef = storage.ref(`images/${imageFile.name}`);
  const uploadTask = storageRef.put(imageFile);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      // Error
      console.error(error);
    },
    () => {
      // Upload completed successfully, now get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('Image available at', downloadURL);

        const title = document.getElementById("title").value;
        const cookingTime = document.getElementById("cookingTime").value;
        const description = document.getElementById("description").value;

        const allergyInfo = Array.from(document.getElementById("allergy-info").selectedOptions).map(option => parseInt(option.value));
        const category = Array.from(document.getElementById("category").selectedOptions).map(option => parseInt(option.value));
        const userId = localStorage.getItem("userId");

        const recipeData = {
          title: title,
          //cookingTime: cookingTime,
          description: description,
          userId: userId, 
          image1Url: downloadURL, // Include the image URL in the recipe data
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
    }
  );
}