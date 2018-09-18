const canvas = document.getElementById('myCanvas');
const sk = J.startSketch(canvas, setup, draw);

const center = J.position(canvas.width / 2, canvas.height / 2);
const planetOrbit = J.circularOrbit(J.constant(center), J.constant(200), 5000);
const moonOrbit = J.circularOrbit(planetOrbit, J.constant(60), 1000);

const planet = J.animatedEllipse(
    canvas,
    J.constant('blue'),
    J.constant(J.size(40, 40)),
    planetOrbit
);
const moon = J.animatedEllipse(
    canvas,
    J.constant('red'),
    J.constant(J.size(10, 10)),
    moonOrbit
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    planet(time);
    moon(time);
}
