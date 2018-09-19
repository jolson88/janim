import * as R from 'ramda';
import { Function, ITime, lerpColor, sinOsc, toPercentage } from './janim';

/**
 * A function for setting the style of an animated shape
 */
export type StyleFunction = (ctx: CanvasRenderingContext2D, t: ITime) => void;

/**
 * Color represented by four channels: red, green, blue, and alpha.
 */
export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

/**
 * Creates an object representing standard four-channel color value
 * @param r Red channel (0-255)
 * @param g Green channel (0-255)
 * @param b Blue channel (0-255)
 * @param a [Optional] Alpha channel (0.0-1.0)
 */
export function color(r: number, g: number, b: number, a = 1): IColor {
    return { a, b, g, r };
}

/**
 * Converts a four-channel color value to a standard CSS color string
 * @param c The four-channel color value
 */
export function toCssColor(c: IColor): string {
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}

/**
 * Rotates back-and-forth between two colors over time
 * @param firstColor color to start with
 * @param secondColor color to rotate to
 * @param duration Amount of time, in milliseconds, it takes to switch between the colors
 * @returns Function that returns the current interpolated color when given the time
 */
export function colorRotate(
    firstColor: IColor,
    secondColor: IColor,
    duration: number,
): Function<ITime, string> {
    return R.pipe(
        sinOsc(duration),
        toPercentage(-1.0, 1.0),
        lerpColor(firstColor, secondColor),
        toCssColor,
    );
}

/**
 * Outlines shapes with solid outline and no fill
 * @param thickness The thickness of the line making the outline
 * @param c Function that returns a color given the time
 * @returns Function that given the rendering context and time, configures the context style
 */
export function outline(thickness: number, c: Function<ITime, string>): StyleFunction {
    return (ctx, t) => {
        ctx.strokeStyle = c(t);
        ctx.lineWidth = thickness;
    };
}
