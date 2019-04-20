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
    event.preventDefault();
    var food = document.querySelector("#search-term").value.trim();
    var youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBQhatp5CZwxyjhKCS8uz7gEouQdhovPNc&q=${food}+tasty`
    console.log(youtubeURL)
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

var art = document.getElementById('artRow');
var vid = document.getElementById('vidRow');

//function that displays card when search button is pressed
function displayCard() {
    art.style.visibility = 'visible';
    vid.style.visibility = 'visible';
    console.log("display cards")
}
//function that adds a little animation when the search button is pressed (New technology: animate.css)
function animateCard() {
    art.setAttribute("class", "animated bounceInUp");
    vid.setAttribute("class", "animated bounceInUp");
    console.log("animateCard");
}

//same on click function but for food2fork API
document.querySelector("#run-search").addEventListener("click", function (event) {

    var food = document.querySelector("#search-term").value.trim();
    document.querySelector("#search-term").value = ""
    if (food === "") {
        document.querySelector("#search-term").setAttribute("placeholder", "Please Enter Food Item Here")
        return
    }

    //call to function to displays the cards
    displayCard();
    //call to function to animate the bottom cards
    animateCard();

    var queryURL = `https://www.food2fork.com/api/search?key=ace7b03a95d1dcbd5b7b4c7694815952&q=${food}&page=2&count=5`
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
            console.log("results", results.length)
            if (results.length === 0) {
                document.querySelector("#recipes-appear-here").innerHTML = ""
                document.querySelector("#search-term").setAttribute("placeholder", "No Recipes Exist")
                return
            }
            else {
                document.querySelector("#search-term").setAttribute("placeholder", "Enter Food")
                document.getElementById("recipes-appear-here").innerHTML = "";
                database.ref().push(results);               
                //Display results here            
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
                    // Appending to the div we created
                    foodDiv.appendChild(foodTitle);
                    foodDiv.appendChild(foodImage);
                    // Prepending the div in the HTML
                    let foodContainer = document.querySelector("#recipes-appear-here");
                    foodContainer.appendChild(foodDiv);
                    foodContainer.appendChild(foodURL);
                }
            }
        });
});
