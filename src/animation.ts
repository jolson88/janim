import * as R from 'ramda';
import {
    color,
    Function,
    IColor,
    IPosition,
    ISize,
    position,
    TimeFunction,
} from './janim';

// The collection of sketches that have been started
const sketches = new Map();

/**
 * Generates a pseudo-random string to be used as an Id
 */
function generateId(): string {
    const gen = () => {
        return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
    };
    return `${gen()}-${gen()}-${gen()}-${gen()}`;
}

/**
 * Creates a circular orbit that returns an orbital position for any given time
 * @param center A function that, given the time, returns the center position at that time
 * @param radius A function that, given the time, returns the radius at that time
 * @param duration The duration in milliseconds of the orbit
 * @param phase A percentage value in range 0..1 saying where the beginning of the orbit is
 * @returns A function that, given the time, returns the position at that time
 */
export function circularOrbit(
    center: TimeFunction<IPosition>,
    radius: TimeFunction<number>,
    duration: number,
    phase: number = 0,
): TimeFunction<IPosition> {
    return (t) => {
        const p = center(t);
        const r = radius(t);
        const radians = ((t % duration) / duration) * 2 * Math.PI;
        const phasedRadians = phase * 2 * Math.PI;
        const xOffset = Math.sin(radians + phasedRadians) * r;
        const yOffset = Math.cos(radians + phasedRadians) * r;
        return position(p.x + xOffset, p.y + yOffset);
    };
}

/**
 * Object representing the transforms to apply to an animated shape
 */
export interface ITransform {
    /** A function that, given the time, returns the position of the shape */
    position: TimeFunction<IPosition>;
    /** A function that, given the time, returns the size of the shape */
    size: TimeFunction<ISize>;
    /** A function that, given the time, returns the rotation in radians */
    rotation: TimeFunction<number>;
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
        const phase = (t % cycleLength) / cycleLength;
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
): string {
    const ctx = canvas.getContext('2d');
    const sketchId = generateId();
    sketches.set(sketchId, draw);

    function loop(beginningTime: number) {
        return () => {
            const currentTime = Date.now();
            const totalTime = currentTime - beginningTime;
            sketches.forEach((fn) => {
                fn(totalTime);
            });

            window.requestAnimationFrame(loop(beginningTime));
        };
    }

    setup(ctx);
    window.requestAnimationFrame(loop(Date.now()));
    return sketchId;
}

/**
 * Creates the transform that is applied to an animated shape
 * @param pos The function that returns the position for a given time
 * @param size The function that returns the size for a given time
 */
export function transform(
    pos: TimeFunction<IPosition>,
    size: TimeFunction<ISize>,
    rotation: TimeFunction<number> = R.always(0),
): ITransform {
    return { position: pos, size, rotation };
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
