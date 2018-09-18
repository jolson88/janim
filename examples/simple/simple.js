const canvas = document.getElementById('myCanvas');
const stopButton = document.getElementById('stopButton');
const startButton = document.getElementById('startButton');
let sk = J.startSketch(canvas, setup, draw);

stopButton.addEventListener('click', () => {
    sk.stop();
});

startButton.addEventListener('click', () => {
    sk = J.startSketch(canvas, setup, draw);
});

function setup(ctx) {
    J.clear(canvas, '#282828');
}

function draw(frame) {
    J.clear(canvas, '#282828');
    const xOffset = R.pipe(J.sinOsc(3000), R.multiply(100));
    frame.ctx.beginPath();
    frame.ctx.fillStyle = 'red';
    frame.ctx.fillRect(
        canvas.width / 2 + xOffset(frame.time),
        canvas.height / 2,
        100,
        100
    );
}
