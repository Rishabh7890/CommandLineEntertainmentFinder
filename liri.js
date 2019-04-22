require("dotenv").config();
// create variables for required items
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
// create variable to access spotify key
var spotify = new Spotify(keys.spotify);
// take in two args
var action = process.argv[2];
var parameter = process.argv[3];
// create a function with switch/case inside to decide which function will be run 
function whichAction() {
  switch (action) {
    case "concert-this":
      bandSearch(parameter);
      break;

    case "spotify-this-song":
      songInfo(parameter);
      break;

    case "movie-this":
      movieInfo(parameter);
      break;

    case "do-what-it-says":
      iWantItThatWay();
      break;

    default:
      console.log("Command Not Found! Please choose from the following options: concert-this, spotify-this-song, movie-this, do-what-it-says");
      break;
  }
};
// create a function to run if action === concert-this
function bandSearch(parameter) {
  if (action === "concert-this") {
    var artist = "";
    for (var i = 3; i < process.argv.length; i++) {
      artist += process.argv[i];
    }
    console.log(artist);
  } else {
    artist = parameter;
    // console.log(artist);
  }
  // create variable for queryURL for bandsInTown
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // console log queryURL
  console.log(queryURL);
  // run a request with axios to bandsInTown 
  axios.get(queryURL).then(
    function (response) {
      // create variable to store parsed response 
      var data = JSON.parse(response);
      // loop through array to get venue information for each event
      for (var i = 0; i < data.length; i++) {
        // get venue name
        console.log("Venue: " + data[i].venue.name);
        // get venue location
        console.log("Location: " + data[i].venue.city);
        // get date of show and convert using moment
        var date = data[i].datetime;
        date = moment(date).format("MM/DD/YYYY");
        console.log("Date: " + date);
      };
    }
  )
  .catch(function(err) {
    console.log(err);
  });
};

whichAction();

// ERRORS WITH CODE: RUNS CONSOLE LOG ON LINE 51 BUT THEN ERROR OCCURS IN AXIOS CALL. SyntaxError: Unexpected token o in JSON at position 1