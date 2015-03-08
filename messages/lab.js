/*  lab.js
    08/03/15
    Comp 20 - Lab 6: Messages
    Jason Fan
*/

function parse()
{
        request = new XMLHttpRequest();
        request.open("GET", "data.json",true);
        request.onreadystatechange = parseData;
        request.send();
}

function parseData() 
{
        if (request.readyState == 4 && request.status == 200) {
            toUpdate = document.getElementById("messages");
            listObjects = JSON.parse(request.responseText);
            for ( i = 0; i < listObjects.length; i++)
                toUpdate.innerHTML += '<p><span class="msg">' + listObjects[i].content + 
                                      ' <span class="username">' + listObjects[i].username + '</span></span></p>';
        }
    
}