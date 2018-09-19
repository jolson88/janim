const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const xOffset = R.pipe(J.sinOsc(3000), R.multiply(100));
const sk = J.startSketch(canvas, setup, draw);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    ctx.fillStyle = 'red';
    ctx.fillRect(
        canvas.width / 2 + xOffset(time),
        canvas.height / 2,
        100,
        100
    );
}
