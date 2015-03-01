function init() {
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = 'pacman10-hp-sprite.png';

    img.onload = function() {
        ctx.drawImage(img, 322, 2, 465, 136, 0, 0, 465, 136);
        ctx.drawImage(img, 82, 20, 20, 20, 40, 25, 20, 20)
    }
}