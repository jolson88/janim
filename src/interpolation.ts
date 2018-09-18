import * as R from 'ramda';
import { sinOsc } from './animation';
import { color, Function, IColor, ITime, toCssColor } from './types';

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
