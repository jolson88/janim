export type Function<T, U> = (arg: T) => U;
export type Function2<T1, T2, U> = (arg1: T1, arg2: T2) => U;
export type Function3<T1, T2, T3, U> = (arg1: T1, arg2: T2, arg3: T3) => U;
export type Function4<T1, T2, T3, T4, U> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => U;

export type Time = number;

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
 * A point in space represented by x and y coordinates
 */
export interface IPosition {
    x: number;
    y: number;
}

/**
 * Represents an object's size in space
 */
export interface ISize {
    width: number;
    height: number;
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
 * A position representing the origin in space
 */
export const origin = position(0, 0);

/**
 * Creates a position in space given x and y coordinates
 * @param x X coordinate
 * @param y Y coordinate
 */
export function position(x: number, y: number): IPosition {
    return { x, y };
}

/**
 * Creates an object representing an object's size in space
 * @param width width
 * @param height height
 */
export function size(width: number, height: number): ISize {
    return { width, height };
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
