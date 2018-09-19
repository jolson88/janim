const canvas = document.getElementById('myCanvas');
const center = J.position(canvas.width / 2, canvas.height / 2);
const sk = J.startSketch(canvas, setup, draw);

const rotator = R.pipe(J.sinOsc(4000), J.toPercentage(-1, 1), R.multiply(2 * Math.PI));
const revRotator = R.pipe(J.sinOsc(4000), R.multiply(-1), J.toPercentage(-1, 1), R.multiply(2 * Math.PI));
const orbit = J.circularOrbit(J.constant(center), J.constant(200), 7000);
const ellipse = J.animatedEllipse(
    canvas,
    J.transform(
        orbit,
        J.constant(J.size(80, 40)),
        rotator
    ),
    J.style(
        J.outline(J.constant('black'), 2),
        J.fill(J.colorRotate(J.color(255, 0, 0), J.color(0, 255, 0), 2000))
    )
);
const rect = J.animatedRect(
    canvas,
    J.transform(
        // Orbit is the center, but rect expects top left. Offset it by half the width to reflect this.
        // TODO: Find a better way to compose these behaviors together as this is awful. It's nice it can
        // be done, but that's not good enough.
        (t) => {
            const pos = orbit(t);
            pos.x = pos.x - 10;
            pos.y = pos.y - 10;
            return pos;
        },
        //orbit,
        J.constant(J.size(20, 20)),
        revRotator
    ),
    J.style(
        J.outline(J.constant('black'), 2),
        J.fill(J.colorRotate(J.color(0, 0, 255), J.color(255, 255, 0), 2000))
    )
)
function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    ellipse(time);
    rect(time);
}
