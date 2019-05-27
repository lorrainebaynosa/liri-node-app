# liri-node-app
LIRI Bot is a Language Interpretation and Recognition Interface instead of the  Speech Interpretation and Recognition Interface used by iPhone's SIRI. LIRI Bot is a Command Line Interface appication, that takes in parameters and returns data. The liri.js file contains the commands that will be accepted by LIRI, namely:
1. "concert-this"
2. "spotify-this-song"
3. "movie-this"
4. "do-what-it-says"

In order to run these commands and utilize the npm packages, the packages must be initiated and installed. See how the package.json file holds required dependencies.package_json


<img src="images/package_json.jpg" width="400">
![](images/package_json.jpg)


What each command should do: 
1. `node liri.js concert-this <artist/band name here>`
   * searches the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")
   * Requires installation of [axios] (https://www.npmjs.com/package/axios) package and [moment] (http://momentjs.com/docs) to retrieve event information related to artist.
   * example using command "concert-this" <artist/band name>, using Lifehouse as the band name:


<img src="images/concert-this_Lifehouse.jpg" width="800">
![](images/concert-this_Lifehouse.jpg)


The information for each event for Lifehouse displays on the terminal:



<img src="images/concert-this_Lifehouse_data.jpg" width="800">
![](images/concert-this_Lifehouse_data.jpg)



The URICencodeURIComponent function allows us to see the same data for artists with more than one word (testing with Maroon 5): 


<img src="images/concert-this_Maroon5.jpg" width="800">
![](images/concert-this_Maroon5.jpg)



The information for each event for Maroon 5 displays on the terminal:



<img src="images/concert-this_Maroon5_data.jpg" width="800">
![](images/concert-this_Maroon5_data.jpg)








2. `node liri.js spotify-this-song '<song name here>'`
   * renders the following information about the song to the terminal
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
        * If no song is provided then your program will default to "The Sign" by Ace of Base.
   * Requires installation of [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package to retrieve song information from the Spotify API.
   * example using command "spotify-this-song" '<song name here>' using "Thriller" as the song: 



<img src="images/spotify-this-song_Thriller1.jpg" width="800">
![](images/spotify-this-song_Thriller1.jpg)




<img src="images/spotify-this-song_Thriller2.jpg" width="800">
![](images/spotify-this-song_Thriller2.jpg)




<img src="images/spotify-this-song_Thriller3.jpg" width="800">
![](images/spotify-this-song_Thriller3.jpg)


The information for each song displays on the terminal:




<img src="images/spotify-this-song_Thriller_data.jpg" width="800">
![](images/spotify-this-song_Thriller_data.jpg)


If no song is provided, "The Sign" from Ace of Base:




<img src="images/spotify-this-song_theSign1.jpg" width="800">
![](images/potify-this-song_theSign1.jpg)

3. `node liri.js movie-this '<movie name here>'`
   * renders the following information about the movie to the terminal
     * Title of the movie.
     * Year the movie came out.
     * IMDB Rating of the movie.
     * Rotten Tomatoes Rating of the movie.
     * Country where the movie was produced.
     * Language of the movie.
     * Plot of the movie.
     * Actors in the movie.
   * Requires installation of [axios] (https://www.npmjs.com/package/axios) package to retrieve data from the OMDB API. Use `trilogy` as API key for OMDB API.
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>. It's on Netflix!
   * example using command "movie-this" '<movie name here>', using 'Pretty Woman' as the movie:





<img src="images/movie-this_PrettyWoman.jpg" width="800">
![](images/movie-this_PrettyWoman.jpg)


The information for each movie displays on the terminal:




<img src="images/movie-this_PrettyWoman_data.jpg" width="800">
![](images/movie-this_PrettyWoman_data.jpg)




* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>. It's on Netflix!
   * example using command "movie-this" '<movie name here>', using 'Mr. Nobody' as the movie:



<img src="images/movie-this_MrNobody.jpg" width="800">
![](images/movie-this_MrNobody.jpg)



The information for each movie displays on the terminal:




<img src="images/movie-this_MrNobody_data.jpg" width="800">
![](images/movie-this_MrNobody_data.jpg)


4. `node liri.js do-what-it-says`
   * Uses `fs` Node package to take text inside of random.txt to call one of LIRI's commands.
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`:




<img src="do-what-it-says_spotify-this-song.jpg" width="800">
![](images/do-what-it-says_spotify-this-song.jpg)


     * Information for "I Want it That Way," displays to terminal:





<img src="do-what-it-says_spotify-this-song_data.jpg" width="800">
![](images/do-what-it-says_spotify-this-song_data.jpg)

     * Edit the text in random.txt to test out the feature for movie-this and concert-this. Testing with: movie-this,"Cinderella" RETURNS:



<img src="images/do-what-it-says-movie-this.jpg" width="800">
![](images/do-what-it-says-movie-this.jpg)


The information for each movie displays on the terminal:




<img src="images/do-what-it-says-movie-this_data.jpg" width="800">
![](images/do-what-it-says-movie-this_data.jpg)












