import * as R from 'ramda';
import {
    Behavior,
    Function,
    IColor,
    IPosition,
    ISize,
} from './janim';

const sketches = new Map();

/**
 * A function for setting the style of an animated shape
 */
export type StyleFunction = (ctx: CanvasRenderingContext2D, t: number) => void;

/**
 * Object representing the transforms to apply to an animated shape
 */
export interface ITransform {
    /** A function that, given the time, returns the position of the shape */
    position: Behavior<IPosition>;
    /** A function that, given the time, returns the size of the shape */
    size: Behavior<ISize>;
    /** A function that, given the time, returns the rotation in radians */
    rotation: Behavior<number>;
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
    draw: Behavior<void>,
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
    pos: Behavior<IPosition>,
    size: Behavior<ISize>,
    rotation: Behavior<number> = R.always(0),
): ITransform {
    return { position: pos, size, rotation };
}

//
// *** Styling ***
//

/**
 * Clears the entire canvas with a given color
 * @param canvas The canvas to fill
 * @param color The CSS color string to fill the canvas with
 */
export function clear(canvas: HTMLCanvasElement, color: string): void {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Fills an animated shape with a color
 * @param c Function that returns the color given the time
 * @returns Function that, given the rendering context and time, configures the context style
 */
export function fill(c: Behavior<IColor>): StyleFunction {
    return (ctx, t) => {
        ctx.fillStyle = toCssColor(c(t));
        ctx.fill();
    };
}

/**
 * Outlines an animated shape with an outline
 * @param c Function that returns the color given the time
 * @param thickness The thickness of the outline
 * @returns Function that, given the rendering context and time, configures the context style
 */
export function outline(c: Behavior<IColor>, thickness: number): StyleFunction {
    return (ctx, t) => {
        ctx.strokeStyle = toCssColor(c(t));
        ctx.lineWidth = thickness;
        ctx.stroke();
    };
}

/**
 * Applies a list of different styles to a given animated shape
 * @param styles List of StyleFunctions to apply to the animated shape
 * @returns A composite StyleFunction that can be passed to animated shapes
 */
export function style(...styles: StyleFunction[]): StyleFunction {
    return (ctx, t) => {
        R.forEach(R.partialRight(R.call, [ctx, t]), styles);
    };
}

/**
 * Converts a four-channel color value to a standard CSS color string
 * @param c The four-channel color value
 */
export function toCssColor(c: IColor): string {
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}

//
// *** Helpers ***
//
/**
 * Generate a pseudo-random string to be used as an Id
 */
function generateId(): string {
    const gen = () => {
        return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
    };
    return `${gen()}-${gen()}-${gen()}-${gen()}`;
}
