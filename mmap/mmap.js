//ACKNOWLEDGEMENTS: IvoryMalinov @  piq.codeus.net/picuter/70010/sumo_wrestler

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
            console.log("3. Leaving the function(position)...");
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}

function renderMap()
{
    console.log("in renderMap")
    me = new google.maps.LatLng(myLat, myLng)
    map.panTo(me); 
    console.log("panned");

    // MARKER FOR MYSELF
    meMarker = new google.maps.Marker({
        position: me,
        title: login,
        icon: 'funny_icon.png' 
    });
    meMarker.setMap(map);
    console.log("meMarker set");
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
    request.onreadystatechange = parseResponse;
    request.send(params);
    console.log(params);
    console.log("params sent");
}

function parseResponse() 
{
    console.log("sending params");
    if (request.readyState == 4 && request.status == 200) {
        console.log("got data back");
        toUpdate = document.getElementById("info");
        data = JSON.parse(request.responseText);
        for (i = 1; i < data.length; i++)
            createMarker(data[i]);
    }
}

function createMarker(person)
{
    var pos = new google.maps.LatLng(person.lat, person.lng)
    // MARKER FOR MYSELF
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: person.login + ':\n' + distanceBetween(myLat, myLng, person.lat, person.lng) + ' Miles away'
    });
    //marker.setMap(map);
    //console.log("Marker set");
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    });
}

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

function distanceBetween(lat1, lng1, lat2, lng2) {
    var R = 3959;
    var dlat = lat2 - lat1;
    var rlat = dlat.toRad();
    var dlng = lng2 - lng1;
    var rlng = dlng.toRad();
    var a = Math.sin(rlat/2) * Math.sin(rlat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(rlng/2) * Math.sin(rlng/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d;
}













