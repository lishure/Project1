
// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2riSvMmVBlocP_AHaLuDyA7RdTeUNVQw",
    authDomain: "project1-1d03b.firebaseapp.com",
    databaseURL: "https://project1-1d03b.firebaseio.com",
    projectId: "project1-1d03b",
    storageBucket: "project1-1d03b.appspot.com",
    messagingSenderId: "937950193220"
};
firebase.initializeApp(config);

//On click function for submit button
document.querySelector("#run-search").addEventListener("click", function (event) {
    var food = document.querySelector("#search-term").value.trim();
    // var food = event.target.innerText;
    //console.log(food)

    var queryURL = `https://api.edamam.com/search?q${food}&7dd99718ade839730978e1d0f2adb4e1&limit=10`;
    //Something to happen here
    console.log(queryURL)
//Fetch request
    fetch(queryURL, {
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results)
    //Display results here            
        document.getElementById("recipes-appear-here").innerHTML = "";


});

});

//On click function for clear button

document.querySelector("#clear-all").addEventListener("click", function (event) {



    //something to happen here
});


//store value in variable


//Need Api key and URL for Youtube

//Need Api Key and URL for Edamam              


//Need Api Key and URL for Edamam


//Need AJAX/fetch function to generate and pull results

//Need a place to put fetch results 

//store results 

//Need a place to put youtube video

//Clear textbox when food is added




