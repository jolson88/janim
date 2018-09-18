import * as R from 'ramda';
import { Function, IPosition, ISize, ITime, makePosition, makeSize } from './types';

/**
 * An oscillator that uses the sin function to calculate its values
 * @param cycleLength The time in milliseconds until the oscillator repeats
 * @returns A function that accepts the time properties of a sketch and returns a value in the range of [-1..1]
 */
export function sinOsc(cycleLength: number): Function<ITime, number> {
    return (time) => {
        const phase = (time.total % cycleLength) / cycleLength;
        return Math.sin(2 * Math.PI * phase);
    };
}

/**
 * Always return a constant value no matter what parameter is passed to returning function
 * @param val Constant value to return from function
 * @returns Function that ignores the parameter passed and always returns specified value
 */
export function constant<T>(val: T): Function<any, T> {
    return R.always(val);
}

/**
 * Always return a constant size no matter what parameter is passed to returning function
 * @param width The object's width
 * @param height The object's height
 * @returns Function that ignores the parameter passed and always returns specified size
 */
export function constantSize(width: number, height: number): Function<any, ISize> {
    return R.always(makeSize(width, height));
}

/**
 * Always return a constant position no matter what parameter is passed to returning function
 * @param x The object's x coordinate
 * @param y The object's y coordinate
 * @returns Function that ignores the parameter passed and always returns specified position
 */
export function constantPosition(x: number, y: number): Function<any, IPosition> {
    return R.always(makePosition(x, y));
}
