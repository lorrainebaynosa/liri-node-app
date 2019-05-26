console.log('This is loaded');

// in order to access environmental variables set in .env file, we must require/import them
// 1. every file in a Node.js application is considered a MODULE. All variables, functions, and code within that module are scoped to that file/container/module or PRIVATE. In order to make the variables, functions, and code public/available to the outside, they must be exported by that module and required/imported by the module that wants to view them. We will access them by:
// 1. require('dotenv').config()
// 2. creating .env file with keys and values

// ./ means current file/module is in same folder as the file/module we want to import

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};


