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
export function makeTime(total: number, elapsed = 0): ITime {
    return {
        elapsed,
        total,
    };
}
