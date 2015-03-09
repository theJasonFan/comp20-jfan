myLat = 0;
myLng = 0;
login = "LindyContreras";
url = "https://secret-about-box.herokuapp.com/sendLocation";

function init() 
{
    elem = document.getElementById("info");
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            postLoc();
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
