// Initialize and add the map
var natural_markers = [];
var natural_colour = '#f8edeb';
var chunk_markers = [];
var chunk_colour = '#fdffb6';
var retouched_markers = [];
var retouched_colour = '#ffc6ff';
var blade_markers = [];
var blade_colour = '#a0c4ff';
var flake_markers = [];
var flake_colour = '#ffd6a5';
var core_markers = [];
var core_colour = '#ffadad';
var other_markers = [];
var other_colour = '#e5e5e5';

var map;

var cat_markers = {'core': core_markers,
                   'flake': flake_markers,
                   'blade': blade_markers,
                   'retouched': retouched_markers,
                   'chunk': chunk_markers,
                   'natural': natural_markers,
                   'other': other_markers}

var core_active = true;
var flake_active = true;
var blade_active = true;
var retouched_active = true;
var chunk_active = true;
var natural_active = true;
var other_active = true;



var categories = [['core', core_markers, core_colour],
                  ['flake', flake_markers, flake_colour],
                  ['blade', blade_markers, blade_colour],
                  ['retouched', retouched_markers, retouched_colour],
                  ['chunk', chunk_markers, chunk_colour],
                  ['natural', natural_markers, natural_colour],
                  ['other', other_markers, other_colour]]
function removeMarkers(markers) {
    for(m of markers) {
        m.setMap(null);
    }

}

function restoreMarkers(markers) {
    for(m of markers) {
        m.setMap(map);
    }
}

function toggle_markers(markers, active) {
    if(active) {
        removeMarkers(markers);
    } else {
        restoreMarkers(markers);
    }
}

function toggle_colour(id, colour, active) {
    var el = document.getElementById(id);
    if(active) {
        el.style.backgroundColor = colour;
    } else {
        el.style.backgroundColor = '#ffffff';
    }
}

function toggle_core() {
    console.log("toggle core")
    toggle_markers(core_markers, core_active);
    core_active = !core_active;
    toggle_colour("core", core_colour, core_active);
}
function toggle_flake() {
    toggle_markers(flake_markers, flake_active);
    flake_active = !flake_active;
    toggle_colour("flake", flake_colour, flake_active);
}
function toggle_blade() {
    toggle_markers(blade_markers, blade_active);
    blade_active = !blade_active;
    toggle_colour("blade", blade_colour, blade_active);
}
function toggle_retouched() {
    toggle_markers(retouched_markers, retouched_active);
    retouched_active = !retouched_active;
    toggle_colour("retouched", retouched_colour, retouched_active);
}
function toggle_chunk() {
    toggle_markers(chunk_markers, chunk_active);
    chunk_active = !chunk_active;
    toggle_colour("chunk", chunk_colour, chunk_active);
}
function toggle_natural() {
    toggle_markers(natural_markers, natural_active);
    natural_active = !natural_active;
    toggle_colour("natural", natural_colour, natural_active);
}
function toggle_other() {
    toggle_markers(other_markers, other_active);
    other_active = !other_active;
    toggle_colour("other", other_colour, other_active);
}


function addMarkers(points, markers, colour) {
    var markerImg = document.querySelector('.markerImage').innerHTML;
    // console.log(markerImg);  

     for(m of points) {
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
                url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImg.replace('{{colour}}', colour)),
                scaledSize: new google.maps.Size(24, 24)
            }
        });
         addInfo(marker, contentString);
         markers.push(marker);
     }
}


function initMap() {
    var center = {lat: 57.06, lng: -2.42};
    // The map, centered at center
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 12, center: center, mapTypeId: 'satellite'});
    
    for(c of categories) {
        addMarkers(data[c[0]], c[1], c[2]);
    }
}

function addInfo(marker, contentString) {
    var infoWindow = new google.maps.InfoWindow({content: contentString});
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}



