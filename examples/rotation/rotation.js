const canvas = document.getElementById('myCanvas');
const center = J.position(canvas.width / 2, canvas.height / 2);
const sk = J.startSketch(canvas, setup, draw);

const rotator = R.pipe(J.sinOsc(4000), J.toPercentage(-1, 1), R.multiply(2 * Math.PI));
const planetOrbit = J.circularOrbit(J.constant(center), J.constant(200), 7000);
const planet = J.animatedEllipse(
    canvas,
    J.transform(
        planetOrbit,
        J.constant(J.size(80, 40)),
        rotator
    ),
    J.style(
        J.outline(J.constant('black'), 2),
        J.fill(J.colorRotate(J.color(255, 0, 0), J.color(0, 255, 0), 2000))
    )
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    planet(time);
}
