import {
    color,
    Function,
    IColor,
    IPosition,
    ISketch,
    ITime,
    position,
    time,
} from './janim';

/**
 * A JAnim Sketch
 */
export interface ISketch {
    /** Stop running this sketch */
    stop: () => void;
}

export function startSketch(
    canvas: HTMLCanvasElement,
    setup: Function<CanvasRenderingContext2D, void>,
    draw: Function<ITime, void>,
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
 * An oscillator that uses the sin function to calculate its values
 * @param cycleLength The time in milliseconds until the oscillator repeats
 * @returns A function that accepts the time properties of a sketch and returns a value in the range of [-1..1]
 */
export function sinOsc(cycleLength: number): Function<ITime, number> {
    return (t) => {
        const phase = (t.total % cycleLength) / cycleLength;
        return Math.sin(2 * Math.PI * phase);
    };
}

/**
 * Creates a circular orbit that returns an orbital position for any given time
 * @param center A function that, given the time, returns the center position at that time
 * @param radius A function that, given the time, returns the radius at that time
 * @param duration The duration in milliseconds of the orbit
 * @returns A function that, given the time, returns the position at that time
 */
export function circularOrbit(
    center: Function<ITime, IPosition>,
    radius: Function<ITime, number>,
    duration: number,
): Function<ITime, IPosition> {
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
