import {
    color,
    Function,
    IColor,
    IPosition,
    ISize,
    ISketch,
    position,
    time,
    TimeFunction,
} from './janim';

/**
 * Creates a circular orbit that returns an orbital position for any given time
 * @param center A function that, given the time, returns the center position at that time
 * @param radius A function that, given the time, returns the radius at that time
 * @param duration The duration in milliseconds of the orbit
 * @returns A function that, given the time, returns the position at that time
 */
export function circularOrbit(
    center: TimeFunction<IPosition>,
    radius: TimeFunction<number>,
    duration: number,
): TimeFunction<IPosition> {
    return (t) => {
        const p = center(t);
        const r = radius(t);
        const radians = ((t.total % duration) / duration) * 2 * Math.PI;
        const xOffset = Math.sin(radians) * r;
        const yOffset = Math.cos(radians) * r;
        return position(p.x + xOffset, p.y + yOffset);
    };
}

/**
 * A Janim Sketch
 */
export interface ISketch {
    /** Stop running this sketch */
    stop: () => void;
}

/**
 * Object representing the transforms to apply to an animated shape
 */
export interface ITransform {
    /** A function that, given the time, returns the position of the shape */
    position: TimeFunction<IPosition>;
    /** A function that, given the time, returns the size of the shape */
    size: TimeFunction<ISize>;
}

/**
 * Calculates an interpolated color between the start color and end color
 * @param startColor The first color to be interpolated between
 * @param endColor The second color to be interpolated between
 * @returns Function that accepts an interpolation percentage between 0..1 and returns a color
 */
export function lerpColor(startColor: IColor, endColor: IColor): Function<number, IColor> {
    const diffR = endColor.r - startColor.r;
    const diffG = endColor.g - startColor.g;
    const diffB = endColor.b - startColor.b;
    const diffA = endColor.a - startColor.a;

    return (lerp) => {
        return color(
            startColor.r + (diffR * lerp),
            startColor.g + (diffG * lerp),
            startColor.b + (diffB * lerp),
            startColor.a + (diffA * lerp),
        );
    };
}

/**
 * An oscillator that uses the sin function to calculate its values
 * @param cycleLength The time in milliseconds until the oscillator repeats
 * @returns A function that accepts the time properties of a sketch and returns a value in the range of [-1..1]
 */
export function sinOsc(cycleLength: number): TimeFunction<number> {
    return (t) => {
        const phase = (t.total % cycleLength) / cycleLength;
        return Math.sin(2 * Math.PI * phase);
    };
}

/**
 * Start a new Janim sketch
 * @param canvas The canvas to draw the sketch on
 * @param setup Function called to setup the sketch
 * @param draw Function called to draw each sketch frame
 */
export function startSketch(
    canvas: HTMLCanvasElement,
    setup: Function<CanvasRenderingContext2D, void>,
    draw: TimeFunction<void>,
): ISketch {
    this.ctx = canvas.getContext('2d');
    this.draw = draw;
    this.playing = false;
    this.startTime = Date.now();

    function loop(sketch: any, beginningTime: number, lastFrameTime: number) {
        return () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - lastFrameTime;
            const totalTime = currentTime - beginningTime;
            sketch.draw(time(totalTime, elapsedTime));

            if (sketch.playing) {
                window.requestAnimationFrame(loop(sketch, beginningTime, currentTime));
            }
        };
    }

    setup(this.ctx);
    this.playing = true;
    window.requestAnimationFrame(loop(this, Date.now(), Date.now()));

    return ((sketch) => {
        return {
            stop: () => {
                sketch.playing = false;
            },
        };
    })(this);
}

/**
 * Creates the transform that is applied to an animated shape
 * @param pos The function that returns the position for a given time
 * @param size The function that returns the size for a given time
 */
export function transform(
    pos: TimeFunction<IPosition>,
    size: TimeFunction<ISize>,
): ITransform {
    return { position: pos, size };
}

/**
 * Compresses a value within a given range to the percentage range of 0..1. Values outside
 * of the range will be converted to either 0 (less than min) or 1 (more than max).
 * @param rangeMin The minimum value of the range
 * @param rangeMax The maximum value of the range
 * @returns A function that accepts the value to convert and returns the percentage
 */
export function toPercentage(rangeMin: number, rangeMax: number): Function<number, number> {
    const totalRange = rangeMax - rangeMin;
    return (val) => {
        if (val < rangeMin || val > rangeMax) {
            return (val < rangeMin) ? 0 : 1;
        }
        const diff = val - rangeMin;
        return diff / totalRange;
    };
}
