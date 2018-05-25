
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


$("#searchButton").on("click", function(){
    event.preventDefault();
    
    var zip = $("#zipCode").val().trim();
    var latitude = Number(zipsToCords[zip].lat);
    var longitude = Number(zipsToCords[zip].lon);
    initMap(latitude, longitude);
});


