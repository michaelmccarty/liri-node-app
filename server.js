require("dotenv").config();


let keys = require("./keys.js");

let clear = require("clear");
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

console.log(process.env.TRILOGY);

if (nodeArgs.length == 2) { //if no command line parameters are passed

    inquirer         //prompting user input
        .prompt([
            {
                type: "input",
                message: "Enter a Movie or a Song Name",
                name: "title"
            },
            {
                type: "list",
                message: "now is that a Movie or a Song?",
                choices: ["Movie", "Song"],
                name: "mORs"
            }
        ]).then(function (inquirerResponse) {
            title = inquirerResponse.title;
            decision = inquirerResponse.mORs;


            clear();


            if (decision == "Movie")
                showMovies(title);
            else if (decision == "Song")
                showSongs(title);
        });
}

// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------

else if (nodeArgs.length > 2) { // if passed arguments at runtime

    let _title = "";
    let selector = "";


    for (let i = 2; i < nodeArgs.length; i++) {  //parse "movie" vs "song" command, then determine what function to call

        if (i > 2 && i < nodeArgs.length) {
            _title = _title + "+" + nodeArgs[i];
        } else {
            _title += nodeArgs[i];

        }
        if (selector == "")
            selector = _title;
    }

    _title = _title.split("+").join(" ");


    if (selector.toLowerCase() == "song")
        showSongs(_title);

    else if (selector.toLowerCase() == "movie")
        showMovies(_title);
    else
        console.log("Please specify song or movie as first word, followed by its Title\n example: `movie Top Gun` or `song Black Magic Woman`");

}




let showSongs = function (song) {
    //_title = _title.split("+").join(" ");

    console.log("\n\n\n"+title+"\n\n\n\n");

    spotify.search({ type: 'track', query: `${title}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album.name);
    });
};





let showMovies = function (movie) {

    let movieName = movie;

    movieName = movieName.split(" ").join("+");

    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+process.env.TRILOGY;

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data.Title);
            console.log("Release Year: " + response.data.Year);
        })
        .catch(function (error) {
            if (error.response) console.log(error.response);
        });
}