// to access .env file with environmental-specific variables, must require and configure dotenv as noted in documentation for dotenv: 
// https://www.npmjs.com/package/dotenv
// process.env now has keys & values defined in .env file (dotenv loads environmental variables from .env file)

require("dotenv").config();

// Include the npm packages:
// enter the following in the terminal: npm init followed by npm install for npm packages dotenv, axios, moment, and node-spotify-api

var axios = require("axios");
var moment = require("moment");
// import keys.js and store it in a variable; to access spotify keys
var keys = require("./keys.js")
// console.log('keys', keys);
var Spotify = require("node-spotify-api");
// Load the fs package to read and write
var fs = require('fs');
var action = process.argv[2];
var cmdArgument = process.argv[3];

// Node application called liri.js will take in in user inputs via the command line to register actions/commands.
// The actions/commands possible are:
// "concert-this"
// "spotify-this-song"
// "movie-this"
// "do-what-it-says"

//  If no song is provided then your program will default to "The Sign" by Ace of Base.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

console.log('process.argv', process.argv)

if (action === "concert-this") {
    concertThis(cmdArgument);
} else if (action === "spotify-this-song") {
    spotifyThisSong(cmdArgument || 'The Sign');
} else if (action === "movie-this") {
    movieThis(cmdArgument || 'Mr.Nobody');
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

function concertThis(artist) {
    // if artist has multiple words, encodeURI component, sample run with API documentation on 
    // https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0#/artist%20events/artistEvents, testing: Maroon 5 as artist: request URL returns:
    // https://rest.bandsintown.com/artists/Maroon%205/events?app_id=40dec023-122f-4fa0-8440-0ef843692fbe

    axios
        // .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=40dec023-122f-4fa0-8440-0ef843692fbe")
        .get("https://rest.bandsintown.com/artists/" + encodeURIComponent(artist) + "/events?app_id=40dec023-122f-4fa0-8440-0ef843692fbe")
        .then(function (response) {
            // console.log('response', response);
            // console.log('typeof response', typeof response);
            const results = response.data;
            if (results.length) {
                console.log('has results', results);
                //loop through it
            } else {
                console.log(`no events for artist`)
            }
            // assuming there is >= 1 results for each artist
            // render the following information about each event to the terminal:
            // Name of the venue 
            // Venue location
            // Date of the Event (use moment to format this as "MM/DD/YYYY")
            for (i = 0; i <results.length; i ++) {
                console.log("Name of Venue: " + results[i].venue.name);
                console.log("Venue location: " + results[i].venue);
                console.log("Venue location, city: " + results[i].venue.city);
                // console.log("Date of the Event: " + results[i].datetime);
                var date = moment(results[i].datetime).format('L');
                console.log("Date of the Event: " + date);
                // var randomDate = results[i].datetime;
                // var randomFormat = "MM/DD/YYYY";
                // var convertedDate = moment(randomDate, randomFormat);
                // console.log("Date of the Event: " + convertedDate.format("MM/DD/YY"));
            }
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

function spotifyThisSong(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        // console.log('data', data);
        console.log('spotify data', data.tracks.items);
        for (i = 0; i <data.tracks.items.length; i++) {
            console.log("Artists: " + data.tracks.items[i].artists);
            console.log("Song's Name: " + data.tracks.items[i].name);
            console.log("Preview Link of Song from Spotify: " + data.tracks.items[i].preview_url);
            console.log("Album Song is From: " + data.tracks.items[i].album.name);
        }
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

function movieThis(movieName) {
    // for movie with multiple words, split by spaces: split() method splits a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split. In this case, the specified separator is a space.
    // NOTE: To split a string with commas, write: .split(",");
    console.log('movieName in movieThis', movieName)
    if (!movieName) {
        console.log('No movie name provided');
        return undefined
    } 
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/> It's on Netflix!

    if (movieName === "Mr. Nobody") {
        console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/> . It's on Netflix!");
    }

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
            // console.log(response.data.Ratings[1]);
            // test Rotten Tomatoes Rating
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of movie: " + response.data.Language);
            console.log("Plot of movie: " + response.data.Plot);
            console.log("Actors in movie: " + response.data.Actors);
        }
    );
}

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
        if (dataArr[0] === "spotify-this-song") {
            spotifyThisSong(dataArr[1]);
        } else if (dataArr[0] === "concert-this") {
            concertThis(dataArr[1]);
        } else if (dataArr[0] === "movie-this") {
            movieThis(dataArr[1]);
        } else {
            console.log("This is not a recognized command")
        }
    });
}
