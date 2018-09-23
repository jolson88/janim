import * as R from 'ramda';
import {
    lerpColor,
    sinOsc,
    TimeFunction,
    toPercentage,
} from './janim';

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
 * Rotates back-and-forth between two colors over time
 * @param firstColor color to start with
 * @param secondColor color to move to
 * @param duration Amount of time, in milliseconds, it takes to switch between colors
 * @returns Function that returns the current interpolated color when given the time
 */
export function colorRotate(
    firstColor: IColor,
    secondColor: IColor,
    duration: number,
): TimeFunction<string> {
    return R.pipe(
        sinOsc(duration),
        toPercentage(-1.0, 1.0),
        lerpColor(firstColor, secondColor),
        toCssColor,
    );
}

/**
 * Fills an animated shape with a color
 * @param c Function that returns the color given the time
 * @returns Function that, given the rendering context and time, configures the context style
 */
export function fill(c: TimeFunction<string>): StyleFunction {
    return (ctx, t) => {
        ctx.fillStyle = c(t);
        ctx.fill();
    };
}

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
 * Outlines an animated shape with an outline
 * @param c Function that returns the color given the time
 * @param thickness The thickness of the outline
 * @returns Function that, given the rendering context and time, configures the context style
 */
export function outline(c: TimeFunction<string>, thickness: number): StyleFunction {
    return (ctx, t) => {
        ctx.strokeStyle = c(t);
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
 * A function for setting the style of an animated shape
 */
export type StyleFunction = (ctx: CanvasRenderingContext2D, t: number) => void;

/**
 * Converts a four-channel color value to a standard CSS color string
 * @param c The four-channel color value
 */
export function toCssColor(c: IColor): string {
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}
