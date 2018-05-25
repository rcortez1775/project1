
// // Initialize and add the map
// function initMap(array) {
//     // The location of Uluru
//     var uluru = {lat: array[0].geolocation.coordinates[0], lng: array[0].geolocation.coordinates[1]};
//     // The map, centered at Uluru
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 2, center: uluru});
//     // The marker, positioned at Uluru
//     for(var i = 0; i < array.length; i++){
//         var coordinates = {lat: array[i].geolocation.coordinates[0], lng: array[i].geolocation.coordinates[1]};
//         var marker = new google.maps.Marker({position: coordinates, map: map});
//     }
//   }

    $.ajax({
        url: "https://data.nasa.gov/resource/y77d-th95.json?year=1950-01-01T00:00:00.000",
        method: "GET"
    }).then(function(response){
        console.log(response);
        var newRow = $("<tr>")
        var name = $("<td>").append(response[0].name);
        var mass = $("<td>").append(response[0].mass);
        var year = $("<td>").append(response[0].year);
        var location = $("<td>").append(response[0].geolocation.coordinates);

        $(".meteorTable").append(newRow.append(name).append(mass).append(year).append(location));

    })





    
