
// Grab text the user typed into the search input,
yearChosen = $("#InputYear").val().trim();


console.log(yearChosen)


// Initialize and add the map
function initMap(array) {
    // The location of Uluru
    var uluru = {lat: array[0].geolocation.coordinates[0], lng: array[0].geolocation.coordinates[1]};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 2, center: uluru});
    // The marker, positioned at Uluru
    for(var i = 0; i < array.length; i++){
        var coordinates = {lat: array[i].geolocation.coordinates[0], lng: array[i].geolocation.coordinates[1]};
        var marker = new google.maps.Marker({position: coordinates, map: map});
    }
  }

    $.ajax({
        url: "https://data.nasa.gov/resource/y77d-th95.json",
        method: "GET"
    }).then(function(response){

        var locations =[];
        for (var i = 0; i < response.length; i++){
            if (response[i].year === yearChosen + "-01-01T00:00:00.000"){
                locations.push(response[i]);

            }
        }
    
        initMap(locations);
       
    })





    