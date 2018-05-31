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

// Function that fills the table with meteors that fell during the year that the user typed ind
$("#searchButton").on("click", function () {

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