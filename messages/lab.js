// Your JavaScript goes here...
function parse()
{
        request = new XMLHttpRequest();
        request.open("GET", "data.json",true);
        request.onreadystatechange = parseData; // prepare function to be called
        request.send(); //Exececute request
}

function parseData() 
{
        if (request.readyState == 4 && request.status == 200) {
            toUpdate = document.getElementById("messages");
            console.log("got messages!")
            toUpdate.innerHTML += '<p class="msg">' + JSON.parse(request.responseText) + '</p>';
        }
    
}