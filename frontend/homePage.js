// Retrieve user information from local storage
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId"); 
const userName = localStorage.getItem("name");

const myHeaders = new Headers();
myHeaders.append("Cookie", "JSESSIONID=F8D5F09E0976AC1CFE34BEA221F56D93");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://localhost:8080/home/popular", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
