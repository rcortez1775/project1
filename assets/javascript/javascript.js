// Initialize Firebase
var config = {
    apiKey: "AIzaSyBH2oGZp0jozjp_BX0Xu9bAw5gq7Wkn9yc",
    authDomain: "my-awesome-project-e9174.firebaseapp.com",
    databaseURL: "https://my-awesome-project-e9174.firebaseio.com",
    projectId: "my-awesome-project-e9174",
    storageBucket: "my-awesome-project-e9174.appspot.com",
    messagingSenderId: "645153337489"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var searchCounter = 0;

// Adds a mapbox map to our page
mapboxgl.accessToken = 'pk.eyJ1IjoibmhvdXN0b24iLCJhIjoiY2pocjM3NW1hMXVrazNhcnlzNXRhYWlwaCJ9.nw1zpdgcZirrMCAev72v7Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
});

// Adds the zoom controls
map.addControl(new mapboxgl.NavigationControl());

// Function that removes all markers
function clearMarkers() {
    $('.allTheMarkers').remove();
};

// Function that fills the table with meteors that fell during the year that the user typed in
$("#searchButton").on("click", function(event){
    
    event.preventDefault();
    $("tbody").empty();
    $("#errorMessage").text('');

    var year = $("#year").val().trim();
    var queryURL = "https://data.nasa.gov/resource/y77d-th95.json?year=" + year + "-01-01T00:00:00.000";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        if (response.length >= 1) {
            // Creates the table and makes a button out of the name of the meteor
            for (var i = 0; i < response.length; i++) {
                var newRow = $("<tr>")
                var name = $("<td button class='meteorButton'>").text(response[i].name);
                name.attr("latitude", response[i].reclat);
                name.attr("longitude", response[i].reclong);
                var mass = $("<td>").append(response[i].mass);
                var location = $("<td>").text("latitude: " + response[i].reclat + " longitude: " + response[i].reclong);
                var yearCell = $("<td>").text(year);

                $(".meteorTable > tbody").append(newRow.append(name).append(mass).append(yearCell).append(location));
            };
        } else {
            $("#errorMessage").text("Houston...We have a problem. No records found. Please try again.");
        };
    });
    $("#year").val("");

    searchCounter ++;
    database.ref().set({
        searchCount: searchCounter
    });

});

database.ref().on("value", function(snapshot) {
    // Change the value of our searchCounter to match the value in the database
    searchCounter = snapshot.val().searchCount;

    // Change the HTML using jQuery to reflect the updated clickCounter value
    $("#numOfSearches").text("Total Searches: " + snapshot.val().searchCount);
  
  // If any errors are experienced, let user know
  }, function(errorObject) {
    $("#numOfSearches").text("Error");
  });

// Makes it so that if user hits enter button then it searches
var input = document.getElementById("year");
input.addEventListener("keyup", function(event){
    event.preventDefault();
    if (event.keyCode === 13){
        document.getElementById("#searchButton").click();
    }
});

// Function that displays a marker with a popup of the meteor name on the map at the latitude and longitude of the meteor that was clicked
$(document).on("click", ".meteorButton", function () {
    var latitude = $(this).attr("latitude");
    var longitude = $(this).attr("longitude");

    var popup = new mapboxgl.Popup({
            offset: 15
        })
        .setText($(this).text());
    var markerElement = document.createElement('div');
    markerElement.id = "marker";
    markerElement.className = "allTheMarkers";
    new mapboxgl.Marker(markerElement)
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);

});

// Function that displays markers on the map for all the meteors that fell during a given year when 'Display All' button is clicked
$("#displayAll").on("click", function () {
    $('.meteorTable td:nth-child(1)').each(function () {
        if (($(this).attr("latitude") !== undefined) && ($(this).attr("longitude") !== undefined)) {
            var popup = new mapboxgl.Popup({
                    offset: 15
                })
                .setText($(this).text());
            var markerElement = document.createElement('div');
            markerElement.id = "marker";
            markerElement.className = "allTheMarkers";
            new mapboxgl.Marker(markerElement)
                .setLngLat([$(this).attr("longitude"), $(this).attr("latitude")])
                .setPopup(popup)
                .addTo(map);
        }
    });
});

// Clears all the markers on the map when the 'Clear All' button is clicked
$("#clearAll").on("click", function () {
    clearMarkers();
});