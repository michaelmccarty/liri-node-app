require("dotenv").config();

let keys = require("./keys.js");


let app = require("express");
let axios = require("axios");
let fs = require("fs");
let inquirer = require("inquirer");
//let spotify = new Spotify(keys.spotify);

let nodeArgs = process.argv;

let decision = "";



if (nodeArgs.length == 2) { //if no command line parameters are passed

    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to look up a Song or a Movie?",
                choices: ["Movie", "Song"],
                name: "mORs"
            }
        ]).then(function (inquirerResponse) {
            console.log("\nYou chose:  " + inquirerResponse.name);
            decision = inquirerResponse.name;
        });
}














let movies = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {


        // Create an empty variable for holding the movie name
        let movieName = "";

        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 2; i < nodeArgs.length; i++) {

            if (i > 2 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];

            }
        }

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


//movies();