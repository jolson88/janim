const canvas = document.getElementById('myCanvas');
const sk = J.startSketch(canvas, setup, draw);

const center = J.position(canvas.width / 2, canvas.height / 2);
const blueToYellow = J.colorRotate(J.color(0, 0, 210), J.color(210, 210, 0), 3000);
const redToGreen = J.colorRotate(J.color(210, 0, 0), J.color(0, 210, 0), 3000);
const planetOrbit = J.circularOrbit(J.constant(center), J.constant(200), 5000);
const moonOrbit = J.circularOrbit(planetOrbit, J.constant(60), 1000);

const planet = J.animatedEllipse(
    canvas,
    J.constant(J.size(40, 40)),
    planetOrbit,
    J.outline(2, blueToYellow),
);
const moon = J.animatedEllipse(
    canvas,
    J.constant(J.size(10, 10)),
    moonOrbit,
    J.outline(2, redToGreen),
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    planet(time);
    moon(time);
}
