import * as R from 'ramda';
import {
    Function,
    IPosition,
    ISketch,
    ITime,
    position,
    time,
} from './types';

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
 * Always return a constant value no matter what parameter is passed to returning function
 * @param val Constant value to return from function
 * @returns Function that ignores the parameter passed and always returns specified value
 */
export function constant<T>(val: T): Function<ITime, T> {
    return R.always(val);
}
