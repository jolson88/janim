# WIP - Janim
Janim is a lightweight, FRP-based, Processing-inspired 2d creative coding library for developers. 

## Goals
**Minimalist**. Janim aims to provide a minimal API surface whose power comes through the composition of its primitives, not by providing a large API that does everything under the sun in its own way. We are surrounded by frameworks that you have to "buy into" and largely write your application in the context of that framework. Many frameworks are too big and bulky for their own good. Their size and learning curves provide obstacles to leveraging them. Janim aims to rectify this by minimizing its own API surface and addressing the essential complexity of visual creative coding: understanding time and how behaviors change over time.

**Getting out of the developer's way**. By leveraging built-in HTML 5 functionality (like the Canvas, simple Css colors, event handlers, etc.) and simple "escape hatches", Janim lets developers write any 2d visualization code they can imagine without Janim needing to provide functionality for any possible scenario under the sun.

**A library for developers**. Popular creative coding frameworks like Processing are extremely powerful and very friendly to beginners. However, being a developer used to modern programming languages, they can also be very limiting as powerful programming concepts like function composition are absent and make it more difficult to build robust and composable visualizations. By using a standard programming language like JavaScript to its fullest, Janim provides a way to think and write animation code that can scale as the project becomes larger.

**Showing the power of Functional Programming**. This project started as an exercise in functional programming. Janim was inspired by a combination of Conal Elliott's and Paul Hudak's original Functional Reactive Programming paper and the joy of Processing. Fundamentally, the core domain concept that makes animation difficult to wrestle with is time and behaviors that change over time. Functional programming, especially a drive for function composition, is incredibly powerful to capture the complexity of animating shapes over time. Janim serves to provide a fun visual example of the power of function composition and functional programming for developers to play around with.

## Concepts
Getting familiar with functional programming and higher-order functions can be difficult to wrap your head around if you aren't experienced with it. This can make the initial learning curve more difficult for developers who aren't familiar with functional programming. However, on the other side of that learning curve lies a land of fun.

TODO

### Time
At its core, the essence of Janim boils down to a single type of function: a function whose parameter is time (representing frame time and total time) and returns the position/size/etc. at that point in time.

```typescript
/**
 * A function representing a value expressed over time
 */
export type Behavior<T> = (time: Time) => T;
```

TODO

### Styles
TODO

## Building the project
Building janim can be done with the following code once the repository has been pulled locally:
```sh
npm install
npm run build
```

## Examples
There are examples that can be found in the `examples` directory in the repository. Once the project has been built, you should be able to open any of the HTML files in the example directories directly in your web browser to see the examples in action.

Below are some simple examples of the type of functionality that can be done with Janim.

### A simple sketch
This example shows a simple red box that moves right and left in time. It also shows how a developer can use the canvas context directly to do any drawing they wish and don't need to rely on all drawing primitives being included in Janim.

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const scaledOffset = R.compose(R.multiply(100), J.sin);
const offset = J.changeSpeed(2, scaledOffset);
J.startSketch(canvas, setup, draw);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    ctx.fillStyle = 'red';
    ctx.fillRect(
        canvas.width / 2 + offset(time),
        canvas.height / 2,
        100,
        100
    );
}
```

### Animating shapes
Let's create a circle that orbits around the center of the canvas. It takes 5 seconds (5000 milliseconds) to complete its orbit.

```js
const canvas = document.getElementById('myCanvas');
const center = J.position(canvas.width / 2, canvas.height / 2);
J.startSketch(canvas, setup, draw);

const planetOrbit = J.changeSpeed(0.2, J.orbit(J.constant(center), J.constant(200)));
const planet = J.animatedEllipse(
    canvas,
    J.transform(
        planetOrbit,
        J.constant(J.size(40, 40))
    ),
    J.outline(J.constant(J.color(0, 0, 0)), 2)
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    planet(time);
}
```

You can see how declarative this approach is. Instead of focusing on imperative code in our `draw` function that is calculating how each frame is rendered, we've declared the behavior we want over time with the orbit and simply give the planet the current frame time to draw it.

As animation is done via higher-order functions, they can easily be composed together to build more complex animations. For example, we can create a new orbit for a moon that orbits around the planet. Notice how the moon's orbit position parameter is actually the planet's orbit itself. This means that at any given time, the moon's position is determined by the planet's position and will change over time as well so the two are kept "in sync" with each other.

```js
const moonOrbit = J.orbit(planetOrbit, J.constant(60));
const moon = J.animatedEllipse(
    canvas,
    J.transform(
        moonOrbit,
        J.constant(J.size(10, 10))
    ),
    J.outline(J.constant(J.color(0, 0, 0)), 2)
);

function setup() {
    J.clear(canvas, 'white');
}

function draw(time) {
    J.clear(canvas, 'white');
    planet(time);
    moon(time);
}
```

### Rotation
You can rotate shapes as well. Similar to other transformations, rotation also supports animating the rotation value over time. If you wanted an ellipse that rotates back and forth (changing direction when it gets to the end), this can be modeled using the `sinOsc` function to a percentage of radians.

```js
const canvas = document.getElementById('myCanvas');
const center = J.position(canvas.width / 2, canvas.height / 2);
const sk = J.startSketch(canvas, setup, draw);

const rotator = R.pipe(
    J.changeSpeed(0.25, J.sin),
    J.toPercentage(-1, 1),
    R.multiply(2 * Math.PI)
);
const revRotator = R.pipe(
    J.changeSpeed(0.25, J.sin),
    R.multiply(-1),
    J.toPercentage(-1, 1),
    R.multiply(2 * Math.PI)
);
const orbit = J.changeSpeed(0.15, J.orbit(J.constant(center), J.constant(200)));

const backRect = J.animatedRect(
    canvas,
    J.transform(
        orbit,
        J.constant(J.size(60, 60)),
        rotator
    ),
    J.outline(J.constant(J.color(0, 0, 0)), 2),
    J.RectMode.Center
);
const frontRect = J.animatedRect(
    canvas,
    J.transform(
        orbit,
        J.constant(J.size(20, 20)),
        revRotator
    ),
    J.outline(J.constant(J.color(0, 0, 0)), 2),
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
```

### Composing styles together
Styles can be composed together as well. We don't need to have something simple like a static outline. These styles can also change over time just like other concepts in Janim. For example, on top of a simple black border, we can also style the planet to change between red/blue and style the moon to change between green/yellow. This is done using a combo of `fill` and `colorRotate` functions combined with `outline` using the `style` combiner function:

```js
const planet = J.animatedEllipse(
    canvas,
    J.transform(
        planetOrbit,
        J.constant(J.size(40, 40))
    ),
    /* New stuff here! */
    J.style(
        J.outline(J.constant(J.color(0, 0, 0)), 2),
        J.fill(J.constant(J.color(255, 0, 0))),
    )
);

const moon = J.animatedEllipse(
    canvas,
    J.transform(
        moonOrbit,
        J.constant(J.size(10, 10))
    ),
    /* New stuff here! */
    J.style(
        J.outline(J.constant(J.color(0, 0, 0)), 3),
        J.fill(J.constant(J.color(0, 0, 255))),
    )
);
```

### Custom Styles
A style is just a function that accepts the rendering context and a time. Because of this, it is quite easy to build your own custom styles using the context directly if you wish. There is no need to wait around until helpers are created in Janim.

```js
const moon = J.animatedEllipse(
    canvas,
    J.transform(
        moonOrbit,
        J.constant(J.size(10, 10))
    ),
    /* New stuff here! */
    (ctx, time) => {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'blue';
    }
);
```

## Open Issues
There are still several areas that need to be explored in Janim:
- A source of events (in FRP sense) to capture how behaviors transition and change over time
- Parity with Canvas rendering context functionality where applicable (like arcs and lines)
- Pause/resume of a sketch (as opposed to just stop/start)
