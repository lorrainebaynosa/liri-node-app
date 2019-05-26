console.log('This is loaded');

// in order to access environmental variables set in .env file, we must require/import them
// .env file with keys and values
// in order to access the spotify keys, we must export them.

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};


