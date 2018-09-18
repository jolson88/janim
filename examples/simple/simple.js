const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const sk = J.startSketch(canvas, setup, draw);
const xOffset = R.pipe(J.sinOsc(3000), R.multiply(100));

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(
        canvas.width / 2 + xOffset(time),
        canvas.height / 2,
        100,
        100
    );
}
