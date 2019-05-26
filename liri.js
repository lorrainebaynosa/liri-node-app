require("dotenv").config();
// to access .env file with environmental-specific vafriables, must require and configure dotenv as noted in documentation for dotenv: 
// https://www.npmjs.com/package/dotenv
// process.env now has keys & values defined in .env file (dotenv loads environmental variables from .env file)
// to require this, must init and install:
// npm init
// npm install dotenv: package.json will now have dotenv listed as a dependency



console.log(keys);
// testing by entering into terminal: 
// node liri.js
// RETURNS: 
// This is loaded
// { id: '42be4d88c0c0459a90ef873c24f8fbf8',
//   secret: '147b244c4ab84af3a3063d987a4fcc55' }
// { spotify:
//    { id: '42be4d88c0c0459a90ef873c24f8fbf8',
//      secret: '147b244c4ab84af3a3063d987a4fcc55' } }

// REVIEW OF CONCEPTS:
// ./ means it's part of the path to a directory/file (in current directory)
// just to test that keys are being generated correctly:

// Include the npm package 
// enter the following in the terminal: npm init followed by npm install for npm packages dotenv and node-spotify-api

var axios = require("axios");
var keys = require("./keys.js")
// import keys.js and store it in a variable; to access spotify keys
var Spotify = require("node-spotify-api");
// Load the fs package to read and write
var fs = require('fs');
var action = process.argv[2];
var artist = process.argv[3];
// SPOTIFY VAR
var song = process.argv[3];
// OMDB API:
var movieName = process.argv[3];;

// Node application called liri.js will take in in user inputs via the command line to register actions/commands.
// The actions/commands possible are:
// "concert-this": see detailed pseudocode below:
// "spotify-this-song": see detailed pseudocode below:
// "movie-this": see detailed pseudocode below:
// "do-what-it-says"

if (action === "concert-this") {
    concertThis();
} else if (action === "spotify-this-song") {
    spotifyThisSong();
} else if (action === "movie-this") {
    movieThis();
} else if (action === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("userInput is not a recognized command")
}

// `node liri.js concert-this <artist/band name here>`will search Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
// * Name of the venue
// * Venue location
// * Date of the Event (use moment to format this as "MM/DD/YYYY")
// Then run a request with axios to the Banks in Town Artist Events API with artist specified

function concertThis() {
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=40dec023-122f-4fa0-8440-0ef843692fbe")
        .then(function (response) {
            console.log(response.data);
            console.log(typeof response);
            var results = JSON.parse(response);
            // parse a string (written in JSON format) to return JavaScript object:
            console.log("Name of the Venue: " + results.venue.name);
            console.log("Venue location: " + results.venue);
            console.log("Date of the Event: " + results.datetime);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

// `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//  Artist(s)
//  The song's name
//  A preview link of the song from Spotify
//  The album that the song is from
//  If no song is provided then your program will default to "The Sign" by Ace of Base.
// console.log(data.artists);
// console.log(data.name);
// console.log(data.preview_url);
// console.log(data.album);
// https://www.npmjs.com/package/node-spotify-api

function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: "Shallow" }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log(data);
    });
}

// `node liri.js movie-this '<movie name here>'` will output the following information to your terminal/bash window:
//     * Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Rotten Tomatoes Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.
//   ```

function movieThis() {
    // for movie with multiple words, split by spaces: split() method splits a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split. In this case, the specified separator is a space.
    // NOTE: To split a string with commas, write: .split(",");

    var movieArr = movieName.split(" ").join("+");
    console.log(movieArr);

    // Run a request with axios to OMDB API with movieName entered in terminal
    // Use "axios" package to retrieve data from the OMDB API. OMDB API requires API key. You may use `trilogy`.

    var queryUrl = "http://www.omdbapi.com/?t=" + movieArr + "&y=&plot=short&apikey=trilogy";

    //  to debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            console.log("Title of Movie: " + response.data.Title);
            console.log("Year Movie Came Out: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            // console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1]; 
            // // for (var key in response.data.Ratings){
            //     console.log(key, response.data.Ratings;
            // }
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of movie: " + response.data.Language);
            console.log("Plot of movie: " + response.data.Plot);
            console.log("Actors in movie: " + response.data.Actors);
        }
    );
}
// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//   * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//   * It's on Netflix!

function doWhatItSays() {
    // This block of code will read from the "random.txt" file.Include "utf8" parameter or the code will provide stream data (garbage)
    // Store the contents of the readFile inside variable "data"

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        console.log(data);

        // Split data by commas (to make it more readable)
        var dataArr = data.split(",");

        // Re-display the content as an array for later use. dataArr[0] is one of LIRI's commands. dataArr[1] is the argument for the command.
        console.log(dataArr);
        console.log(dataArr[0]);
        console.log(dataArr[1]);
        if (dataArr[0]=== "spotify-this-song"){
            spotifyThisSong(dataArr[1]);
        } else if (dataArr[0] === "concert-this") {
            concertThis(dataArr[1]);
        } else if (dataArr[0] === "movie-this") {
            movieThis();
        } else {
            console.log("This is not a recognized command")
        }
    });
}
