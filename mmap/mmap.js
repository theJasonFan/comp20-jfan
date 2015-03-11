// ACKNOWLEDGEMENTS: 
// Custom image for me, IvoryMalinov @  piq.codeus.net/picuter/70010/sumo_wrestler
// Haversine formula - http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript


myLat = 0;
myLng = 0;
login = "LindyContreras";
url = "https://secret-about-box.herokuapp.com/sendLocation";
me = new google.maps.LatLng(myLat, myLng);
infowindow = new google.maps.InfoWindow();
myOptions = {
        zoom: 13,
        center: me,
        mapTypeId: google.maps.MapTypeId.ROADMAP
}

function init()
{
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getLocations();
}

function getLocations() 
{
    elem = document.getElementById("info");
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            renderMap();
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng)
    map.panTo(me); 

    // MARKER FOR MYSELF
    meMarker = new google.maps.Marker({
        position: me,
        title: login + " <br> Here I Am!"
        map: map,
        icon: 'funny_icon.png' 
    });

    google.maps.event.addListener(meMarker, 'click', function() {
        infowindow.setContent(meMarker.title);
        infowindow.open(map, meMarker);
    });

    // MARKER FOR OTHERS
    markOthers();
}

function markOthers()
{
    //POST to herokuapp
    var params = 'login=' + login + '&lat=' + myLat + '&lng=' + myLng;
    request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //Parse JSON response
    request.onreadystatechange = parseResponse;
    request.send(params);
}

function parseResponse() 
{
    if (request.readyState == 4 && request.status == 200) {
        data = JSON.parse(request.responseText);
        // start at index i == 1, since we have our own location at index 0
        for (i = 1; i < data.length; i++)
            createMarker(data[i]);
    }
}

function createMarker(person)
{
    var pos = new google.maps.LatLng(person.lat, person.lng)
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: person.login + ': <br>'
             + distanceBetween(myLat, myLng, person.lat, person.lng).toFixed(4) + ' Miles away'
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    });
}

// Harvarsine Formula - Taken from:
// http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
function distanceBetween(lat1, lng1, lat2, lng2) {
    var R = 3959;
    var dlat = lat2 - lat1;
    var rlat = dlat.toRad();
    var dlng = lng2 - lng1;
    var rlng = dlng.toRad();

    var a =   Math.sin(rlat/2) * Math.sin(rlat/2) + 
            + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad())
            * Math.sin(rlng/2) * Math.sin(rlng/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d;
}

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}