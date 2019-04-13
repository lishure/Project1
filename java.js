

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB2ZKwkNlHy3C06TaV22Gve40x8WpqZP9g",
    authDomain: "team-recipe.firebaseapp.com",
    databaseURL: "https://team-recipe.firebaseio.com",
    projectId: "team-recipe",
    storageBucket: "team-recipe.appspot.com",
    messagingSenderId: "907907278801"
};
firebase.initializeApp(config);

var database = firebase.database();

//On click function for submit button
document.querySelector("#run-search").addEventListener("click", function (event) {
    var food = document.querySelector("#search-term").value.trim();
    // var food = event.target.innerText;
    //console.log(food)
    // var queryURL = `https://www.food2fork.com/api/search?key=1bcfc7464950bb7cf1bbc4383521d0e5&q=${food}`;
    var queryURL = `https://www.food2fork.com/api/search?key=987d1f959c3b41f502a9e74d5a6ad40f&q=${food}&page=2&count=5`
    // var queryURL = `https://api.edamam.com/search?q${food}&7dd99718ade839730978e1d0f2adb4e1&limit=10`;
    //Something to happen here

   console.log(queryURL)

    // Holds train data
    var newFood = {
        foodInput: food,
    };

    // Uploads data to the Firebase database
    database.ref().push(newFood);

    console.log(newFood.food)

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
            var results = response.recipes;

            document.getElementById("recipes-appear-here").innerHTML = "";
            //console.log(response)

            //Display results here            
            //document.getElementById("recipes-appear-here").innerHTML = "";
            //  document.getElementById("recipes-appear-here").innerHTML = JSON.stringify(results);
            ///////////////////////////////////////////////////////////////////////////////////////////
            for (let response of results) {
                console.log(response)

                // Creating a div for the gif
                var foodDiv = document.createElement("div");

                var foodTitle = document.createElement("h3");
                foodTitle.innerHTML = response.title

                // Creating an image tag
                var foodImage = document.createElement("img");
                foodImage.src = response.image_url

                var foodURL = document.createElement("a");
                foodURL.href = response.f2f_url
                foodURL.target = "_blank"
                console.log(foodURL);

                var foodButton = document.createElement("button");
                foodButton.innerHTML = "Get Recipe"

                foodURL.appendChild(foodButton);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                foodDiv.appendChild(foodTitle);
                foodDiv.appendChild(foodImage);


                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                let foodContainer = document.querySelector("#recipes-appear-here");
                foodContainer.appendChild(foodDiv);
                foodContainer.appendChild(foodURL);

            }

        });

});

document.querySelector("#run-search").addEventListener("click", function (event) {
    var food = document.querySelector("#search-term").value.trim();
 
var youtubeURL =`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDV4BgUh8Hgaxji7X7ZX1jSYLDnW79GuzA&q=${food}`
console.log(youtubeURL)
//On click function for clear button


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




