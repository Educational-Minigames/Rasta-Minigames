function main() {
    var text = String(document.getElementById("paragraph_text").value);
    var array = {};
    document.getElementById("text_digit").innerHTML = text.length;

    for (var i = 0; i < text.length; i++) {

        var current = text.charAt(i);

        if (current in array) {
            array[current] = array[current] + 1;

        } else {
            array[current] = 1;
        }

    }

    remove();
    createNodes(array);
}

function reset() {
    location.reload();
}

function remove() {
    var coded = document.getElementById("coded");
    coded.innerHTML = "";
    var graph = document.querySelector('svg');
    if (graph) { graph.parentElement.removeChild(graph) };

}

var huffman = document.getElementById("huffman");
var starty, startx, scrleft, scrtop, isdown;

huffman.addEventListener('mousedown', e => MouseDown(e));
huffman.addEventListener('mouseup', e => mouseUp(e))
huffman.addEventListener('mouseleave', e => mouseLeave(e));
huffman.addEventListener('mousemove', e => mouseMove(e));

function MouseDown(e) {
    isdown = true;
    startx = e.pageX - huffman.offsetLeft;
    starty = e.pageY - huffman.offsetTop;
    scrleft = huffman.scrollLeft;
    scrtop = huffman.scrollTop;
}

function mouseUp(e) {
    isdown = false;
}

function mouseLeave(e) {
    isdown = false;
}

function mouseMove(e) {
    if (isdown) {
        e.preventDefault();

        var y = e.pageY - huffman.offsetTop;
        var goY = y - starty;
        huffman.scrollTop = scrtop - goY;

        var x = e.pageX - huffman.offsetLeft;
        var goX = x - startx;
        huffman.scrollLeft = scrleft - goX;
    }
}

var binary_btn = document.getElementById("bin_click");
var dig = document.getElementById("binary_digit");
var bin = document.getElementById("binary");

var code_dig = document.getElementById("encoded_digit");
var res = document.getElementById("result");
var cod = document.getElementById("coded");
