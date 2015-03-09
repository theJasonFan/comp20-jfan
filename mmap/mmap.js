myLat = 0;
myLng = 0;
login = "LindyContreras";
url = "https://secret-about-box.herokuapp.com/sendLocation";

function init() 
{
    // Set up map
                var myOptions = {
                    zoom: 13, // The larger the zoom number, the bigger the zoom
                    center: landmark,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    elem = document.getElementById("info");
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            postLoc();
            reanderMap();
            console.log("3. Leaving the function(position)...");
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}


function postLoc()
{
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
        for (i = 0; i < data.length; i++)
            printLocs(data[i]);
    }
}

function printLocs(data)
{
    elem.innerHTML += "<p>" + data.login + "-" + data.lat + "," + data.lng + "</p>";
}

function renderMap()
            {
                me = new google.maps.LatLng(myLat, myLng);
                
                // Update map and go there...
                map.panTo(me);
    
                // Create a marker
                marker = new google.maps.Marker({
                    position: me,
                    title: "Here I Am!"
                });
                marker.setMap(map);
                    
                // Open info window on click of marker
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(marker.title);
                    infowindow.open(map, marker);
                });
                
                // Calling Google Places API
                var request = {
                    location: me,
                    radius: '500',
                    types: ['food']
                };
                service = new google.maps.places.PlacesService(map);
                service.search(request, callback);
            }