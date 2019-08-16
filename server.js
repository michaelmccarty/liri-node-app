require("dotenv").config();

let keys = require("./keys.js");


let app = require("express");
let axios = require("axios");
let fs = require("fs");
let inquirer = require("inquirer");
let Spotify = require('node-spotify-api');
let spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});


let nodeArgs = process.argv;

let decision = "";
let title = "";



if (nodeArgs.length == 2) { //if no command line parameters are passed

    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter a Movie or a Song",
                name: "title"
            },
            {
                type: "list",
                message: "Is it a Movie or a Song?",
                choices: ["Movie", "Song"],
                name: "mORs"
            }
        ]).then(function (inquirerResponse) {
            console.log("\nYou chose:  " + inquirerResponse.title);
            title = inquirerResponse.title;
            console.log("\nYou chose:  " + inquirerResponse.mORs);
            decision = inquirerResponse.mORs;
        });
    if (decision == "Movie")
        showMovies(title);
    else if (decision == "Song")
        showSongs(title);
}

else if (nodeArgs.length > 2) { // if passed arguments at runtime

    let _title = "";
    let selector = "";


    for (let i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {
            _title = _title + "+" + nodeArgs[i];
        } else {
            _title += nodeArgs[i];

        }
        if (selector=="")
            selector=_title;
    }

    console.log(_title);

    if (selector.toLowerCase()=="song")
        console.log("success");

}




let showSongs = function (song) {
    spotify.search({ type: 'track', query: `${title}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album.name);
    });
};




/**
let showMovies = function (movie) {

    let movieName = movie;

    fs.readFile("random.txt", "utf8", function (error, data) {


        // Create an empty variable for holding the movie name
        //let movieName = "";

        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        // for (var i = 2; i < nodeArgs.length; i++) {

        //     if (i > 2 && i < nodeArgs.length) {
        //         movieName = movieName + "+" + nodeArgs[i];
        //     } else {
        //         movieName += nodeArgs[i];

        //     }
        // }

        let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        axios.get(queryUrl).then(
            function (response) {
                console.log("Release Year: " + response.data.Year);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
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




        if (error) { return console.log(error); }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    });
}
*/


/**
        Artist(s)

        The song's name

        A preview link of the song from Spotify

        The album that the song is from
 */