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
    //call to function to displays the cards
    displayCard();
    var food = document.querySelector("#search-term").value.trim();
    var queryURL = `https://www.food2fork.com/api/search?key=155d84c144c0549aca44fff5ead3c499&q=${food}&page=2&count=5`
    //Something to happen here
    console.log(queryURL)
    // Holds food data
    var newFood = {
        foodInput: food,
    };
    // Uploads data to the Firebase database
    database.ref().push(newFood);
    console.log(newFood.foodInput)
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
            //  document.getElementById("recipes-appear-here").innerHTML = JSON.stringify(results);
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
                //added bootstrap class to buttons inside of the recipe dive
                foodButton.setAttribute("class", "btn btn-default")
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
    event.preventDefault();
    var food = document.querySelector("#search-term").value.trim();
    var youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDV4BgUh8Hgaxji7X7ZX1jSYLDnW79GuzA&q=${food}+tasty`
    console.log(youtubeURL)
    //On click function for clear button
    var newFood = {
        foodInput: food,
    };
    // Uploads data to the Firebase database
    database.ref().push(newFood);
    console.log(newFood.foodInput);
    fetch(youtubeURL, {
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            document.addEventListener(
                'DOMContentLoaded', () => setTimeout(initializeFreshchatWidget, 100)
            )
            var youtubeVideos = response.items[0].id.videoId
            ytplayer.loadVideoById({ videoId: youtubeVideos })
            // Storing an array of results in the results variable
            var results = response.items;
            console.log(results)
            document.getElementById("video-appear-here").innerHTML = "";
        });
});
//create iframe for youtube
function video() {
    console.log("video function call")
    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
//run youtube function.
var ytplayer;
function onYouTubeIframeAPIReady() {
    console.log("onYouTubeIframeAPIReady")
    ytplayer = new YT.Player("video-appear-here", {
    });
}
video();

//function that displays card when search button is pressed
function displayCard() {
    document.getElementById('artRow').style.visibility='visible';
    document.getElementById('vidRow').style.visibility='visible';
    console.log("display cards")
}
