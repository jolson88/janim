import * as R from 'ramda';

/**
 * Always return a constant value no matter what parameter is passed to returning function
 * @param val Constant value to return from function
 * @returns Function that ignores the parameter passed and always returns specified value
 */
export function constant<T>(val: T): TimeFunction<T> {
    return R.always(val);
}

/**
 * A simple unary function
 */
export type Function<T, U> = (arg: T) => U;

/**
 * A function representing a value expressed over time
 */
export type TimeFunction<T> = (time: number) => T;

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
