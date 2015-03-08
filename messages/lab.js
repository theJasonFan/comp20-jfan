// Your JavaScript goes here...
function parse()
{
        request = new XMLHttpRequest();
        request.open("GET", "data.json",true);
        request.onreadystatechange = parseData; // prepare function to be called
        request.send(); //Exececute request
}

parseData() {
        if (request.readyState == 4 && request.status == 200) {
            toUpdate = document.getElementByID("messages");
            toUpdate.innerHTML += '<p class="msg">' + request.data + '</p>';
        }
    
}