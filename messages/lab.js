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
            listObjects = JSON.parse(request.responseText);
            for ( i = 0; i < listObjects.length; i++)
                toUpdate.innerHTML += '<p class="msg">' + listObjects[i].content + 
                                      ' <span class=username>' + listObjects[i].username + '</span></p>';
        }
    
}