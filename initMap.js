// Initialize and add the map
function initMap() {
  var markerImg = document.querySelector('.markerImage').innerHTML;
    console.log(markerImg);  
  var center = {lat: 57.06, lng: -2.42};
  // The map, centered at center
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: center, mapTypeId: 'satellite'});
  // The marker, positioned at Uluru
    for(m of data) {
        var contentString = '<div id="content">'+
            '<h2>'+m['type']+'</h2>'+
            '<table style="padding: 5px;"><tr>'+
            '<tr><td><strong>Latitude: </strong></td><td> '+m['lat']+'</td></tr>'+
            '<tr><td><strong>Longitude:</strong></td><td> '+m['lon']+'</td></tr>'+
            '<tr><td><strong>Northing: </strong></td><td> '+m['northing']+'</td></tr>'+
            '<tr><td><strong>Easting: </strong></td><td> '+m['easting']+'</td></tr>'+
            '<td><strong>Sub Type: </strong></td><td>'+m['subType']+'</td></tr>'+
            '<tr><td><strong>Classification: </strong></td><td> '+m['classification']+'</td></tr>'+
            '<tr><td><strong>Condition: </strong></td><td> '+m['condition']+'</td></tr>'+
            '<tr><td><strong>Raw Material: </strong></td><td> '+m['rawMaterial']+'</td></tr>'+
            '<tr><td><strong>No of Pieces: </strong></td><td> '+m['totalAC']+'</td></tr>'+
            '<tr><td><strong>Description: </strong></td><td> '+m['description']+'</td></tr></table>';
        if(m['photo']) {
            contentString = contentString+'<strong>Photo:</strong><br><img src='+m['photo']+'>';
        }
        var marker = new google.maps.Marker({
            position: {lat: m["lat"], lng: m["lon"]},
            map: map,
            icon: {
                anchor: new google.maps.Point(24, 24),
                url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImg.replace('{{colour}}', m['colour'])),
                scaledSize: new google.maps.Size(24, 24)
            }
        });
        addInfo(marker, contentString);
       
    }
}

function addInfo(marker, contentString) {
    var infoWindow = new google.maps.InfoWindow({content: contentString});
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}
    

