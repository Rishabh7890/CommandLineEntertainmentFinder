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
  console.log("-------------------------");
  // run a request with axios to bandsInTown 
  axios.get(queryURL).then(
    function (response) {
      // create variable to store parsed response 
      // var data = JSON.parse(response);
      // loop through array to get venue information for each event
      // console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        // get venue name
        console.log("Venue: " + response.data[i].venue.name);
        // get venue location
        console.log("Location: " + response.data[i].venue.city);
        // get date of show and convert using moment
        var date = response.data[i].datetime;
        date = moment(date).format("MM/DD/YYYY");
        console.log("Date: " + date);
        console.log("-------------------------");
      };
    }
  )
  .catch(function(err) {
    console.log(err);
  });
};

function songInfo(parameter) {
  if(action === "spotify-this-song") {
    var song = "";
    for(var i = 3; i < process.argv.length; i++) {
      song += process.argv[i];
    }
    console.log(song);
  }
  else {
    song = parameter;
  }
  if(parameter === undefined) {
    song = "The Sign ace of base";
    console.log(song);
  }

  spotify.search({
    type: "track",
    query: song
  }, function(err, data) {
    if(err) {
      console.log("Error: " + err);
      return;
    }
    else {
      console.log("-------------------------");
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[3].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("-------------------------");
    }
  })
}

whichAction();

//Fixed axios call for bands in town.