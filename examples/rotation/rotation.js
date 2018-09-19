const canvas = document.getElementById('myCanvas');
const center = J.position(canvas.width / 2, canvas.height / 2);
const sk = J.startSketch(canvas, setup, draw);

const rotator = R.pipe(J.sinOsc(4000), J.toPercentage(-1, 1), R.multiply(2 * Math.PI));
const revRotator = R.pipe(J.sinOsc(4000), R.multiply(-1), J.toPercentage(-1, 1), R.multiply(2 * Math.PI));
const orbit = J.circularOrbit(J.constant(center), J.constant(200), 7000);
const backRect = J.animatedRect(
    canvas,
    J.transform(
        orbit,
        J.constant(J.size(60, 60)),
        rotator
    ),
    J.style(
        J.outline(J.constant('black'), 2),
        J.fill(J.colorRotate(J.color(0, 0, 255), J.color(255, 255, 0), 2000))
    ),
    J.RectMode.Center
);
const frontRect = J.animatedRect(
    canvas,
    J.transform(
        orbit,
        J.constant(J.size(20, 20)),
        revRotator
    ),
    J.style(
        J.outline(J.constant('black'), 2),
        J.fill(J.colorRotate(J.color(255, 0, 0), J.color(0, 255, 0), 2000))
    ),
    J.RectMode.Center
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    backRect(time);
    frontRect(time);
}
