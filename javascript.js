
// Initialize and add the map
function initMap(latitude, longitude) {
    // The location of Uluru
    var uluru = {lat: latitude, lng: longitude};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

    $.ajax({
        url: "https://data.nasa.gov/resource/y77d-th95.json",
        method: "GET"
    }).then(function(response){
        for (var i = 0; i < response.length; i++){
            if (response[i].year === "1951-01-01T00:00:00.000"){
                console.log(response[i]);
            }
        }
        console.log(response);
        console.log(response[0].geolocation.coordinates[0]);
        var latitude = response[0].geolocation.coordinates[0];
        var longitude = response[0].geolocation.coordinates[1];

        initMap(latitude, longitude);

        latitude = response[1].geolocation.coordinates[0];
        longitude = response[1].geolocation.coordinates[1];

        initMap(latitude, longitude);
    })





    // var zip = $("#zipCode").val().trim();
    // var latitude = Number(zipsToCords[zip].lat);
    // var longitude = Number(zipsToCords[zip].lon);
    // initMap(latitude, longitude);

    // $.ajax({
    //     url: "https://api.nasa.gov/planetary/earth/imagery?lat=" + latitude + "&lon=" + longitude + "&api_key=By5LzpSAOqz2Ug4UR759IGV5ao1Kebjt0ZVW2vOA",
    //     method: "GET"
    // }).then(function(response){
    //     var spaceImage = $("<img id='nasaPhoto'>").attr("src", response.url);
    //     $("body").append(spaceImage);
    // })