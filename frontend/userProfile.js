document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    const formFields = document.querySelectorAll("#profileForm input, #profileForm textarea");
  
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
  