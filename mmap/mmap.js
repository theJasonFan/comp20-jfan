mylat = 0;
mylng = 0;
login = "LindyContreras";
url = "https://secret-about-box.herokuapp.com/sendLocation";

function getMyLocation() 
{
    console.log("1. In getMyLocation()");
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("2. Finally got your location!");
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            elem = document.getElementById("info");
            elem.innerHTML += "<h1>You are in " + myLat + ", " + myLng + "</h1>";
            console.log("3. Leaving the function(position)...");
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
        console.log("4. Leaving getMyLocation(). Good bye cruel world!");
}


function postLoc()
{
    var params = '"login=' + login + '&lat=' + mylat + '&lng=' + mylng +'"';
    request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.onreadystatechange = parseData;
    request.send(params);
    console.log(params);
    console.log("params sent");
}

function parseData() 
{
    console.log("sending params");
    if (request.readyState == 4 && request.status == 200) {
        console.log("got data back");
        toUpdate = document.getElementById("info");
        responseText = JSON.parse(request.responseText);
        toUpdate.innerHTML += '<p>' + responseText + '</p>';
    }
}

function init()
{
    getMyLocation();
    postLoc();
}