const canvas = document.getElementById('myCanvas');
const center = J.position(canvas.width / 2, canvas.height / 2);
const sk = J.startSketch(canvas, setup, draw);

const planetOrbit = J.circularOrbit(J.constant(center), J.constant(200), 7000);
const planet = J.animatedEllipse(
    canvas,
    J.transform(
        planetOrbit,
        J.constant(J.size(40, 40))
    ),
    J.style(
        J.outline(J.constant('black'), 2),
        J.fill(J.colorRotate(J.color(230, 0, 0), J.color(0, 230, 0), 4000))
    )
);

const moonOrbit = J.circularOrbit(planetOrbit, J.constant(60), 1000);
const moon = J.animatedEllipse(
    canvas,
    J.transform(
        moonOrbit,
        J.constant(J.size(10, 10))
    ),
    J.style(
        J.outline(J.constant('black'), 3),
        J.fill(J.colorRotate(J.color(0, 0, 230), J.color(230, 230, 0), 4000))
    )
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    planet(time);
    moon(time);
}
