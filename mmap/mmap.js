 function getMyLocation() {
                console.log("1. In getMyLocation()");
                if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
                    navigator.geolocation.getCurrentPosition(function(position) {
                            console.log("2. Finally got your location!");
                            myLat = position.coords.latitude;
                            myLng = position.coords.longitude;
                            elem = document.getElementById("info");
                            elem.innerHTML = "<h1>You are in " + myLat + ", " + myLng + "</h1>";
                            console.log("3. Leaving the function(position)...");
                        });
                }
                else {
                    alert("Geolocation is not supported by your web browser.  What a shame!");
                }
                console.log("4. Leaving getMyLocation(). Good bye cruel world!");
            }