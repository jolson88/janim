import * as R from 'ramda';

/**
 * A simple unary function
 */
export type Function<T, U> = (arg: T) => U;

/**
 * The time properties of a running sketch
 */
export interface ITime {
    /**
     * The total time in milliseconds since the sketch was started
     */
    total: number;

    /**
     * The elapsed time in milliseconds since the previous frame of the sketch
     */
    elapsed: number;
}

/**
 * Creates an object adhering to ITime interface
 * @param total The total time in milliseconds
 * @param elapsed The elapsed time in milliseconds since previous frame
 */
export function time(total: number, elapsed = 0): ITime {
    return { elapsed, total };
}

/**
 * A point in space represented by x and y coordinates
 */
export interface IPosition {
    x: number;
    y: number;
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
 * Represents an object's size in space
 */
export interface ISize {
    width: number;
    height: number;
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
 * Always return a constant value no matter what parameter is passed to returning function
 * @param val Constant value to return from function
 * @returns Function that ignores the parameter passed and always returns specified value
 */
export function constant<T>(val: T): Function<ITime, T> {
    return R.always(val);
}
