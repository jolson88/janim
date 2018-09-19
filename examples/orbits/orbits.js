const canvas = document.getElementById('myCanvas');
const sk = J.startSketch(canvas, setup, draw);

const blue = J.color(0, 0, 230);
const yellow = J.color(230, 230, 0);
const red = J.color(230, 0, 0);
const green = J.color(0, 230, 0);

const center = J.position(canvas.width / 2, canvas.height / 2);
const planetOrbit = J.circularOrbit(J.constant(center), J.constant(200), 7000);
const moonOrbit = J.circularOrbit(planetOrbit, J.constant(60), 1000);

const planet = J.animatedEllipse(
    canvas,
    J.transform(
        planetOrbit,
        J.constant(J.size(40, 40))
    ),
    J.style(
        J.outline(J.constant('black'), 3),
        J.fill(J.colorRotate(blue, yellow, 4000))
    )
);
const moon = J.animatedEllipse(
    canvas,
    J.transform(
        moonOrbit,
        J.constant(J.size(10, 10))
    ),
    J.style(
        J.outline(J.constant('black'), 3),
        J.fill(J.colorRotate(red, green, 4000))
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
