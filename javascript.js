// Adds a mapbox map to our page
mapboxgl.accessToken = 'pk.eyJ1IjoibmhvdXN0b24iLCJhIjoiY2pocjM3NW1hMXVrazNhcnlzNXRhYWlwaCJ9.nw1zpdgcZirrMCAev72v7Q';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10'
});

// Adds the zoom controls
map.addControl(new mapboxgl.NavigationControl());

// Function that clears all markers
function clearMarkers(){
    $("#marker").remove();
}

// Function that fills the table with meteors that fell during the year that the user typed in
$("#searchButton").on("click", function(){
    
    $("tbody").empty();

    var year = $("#year").val().trim();
    var queryURL = "https://data.nasa.gov/resource/y77d-th95.json?year=" + year + "-01-01T00:00:00.000";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        for(var i = 0; i < response.length; i ++){
            var newRow = $("<tr>")
            var name = $("<td button class='meteorButton'>").text(response[i].name);
            name.attr("latitude", response[i].reclat);
            name.attr("longitude", response[i].reclong);
            var mass = $("<td>").append(response[i].mass);
            var location = $("<td>").text("latitude: " + response[i].reclat + " longitude: " + response[i].reclong);
            var yearCell = $("<td>").text(year);

        $(".meteorTable > tbody").append(newRow.append(name).append(mass).append(yearCell).append(location));
        }

        $("#displayAll").on("click", function(){
            for (var i = 0; i < response.length; i++){
                if(response[i].reclat !== undefined) {
                    var popup = new mapboxgl.Popup({ offset: 15 })
                    .setText(response[i].name);
                    var markerElement = document.createElement('div');
                    markerElement.id = "marker";
                    new mapboxgl.Marker(markerElement)
                        .setLngLat([response[i].reclong, response[i].reclat])
                        .setPopup(popup)
                        .addTo(map);
                }
            }
        });
    })

    $("#year").val("");
})

// Function that displays a marker with a popup of the meteor name on the map at the latitude and longitude of the meteor that was clicked
$(document).on("click", ".meteorButton", function(){
    // $("#marker").remove();
    var latitude = $(this).attr("latitude");
    var longitude = $(this).attr("longitude");

    var popup = new mapboxgl.Popup({ offset: 15 })
    .setText($(this).text());
    var markerElement = document.createElement('div');
    markerElement.id = "marker";
    new mapboxgl.Marker(markerElement)
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);
    
});

$("#clearAll").on("click", function(){

})