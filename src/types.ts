/**
 * A simple unary function
 */
export type Function<T, U> = (arg: T) => U;

/**
 * The time properties of a running sketch
 */
export class Time {
    /**
     * The total time in milliseconds since the sketch was started
     */
    total: number;

    /**
     * The elapsed time in milliseconds since the previous frame of the sketch
     */
    elapsed: number;

    constructor(total: number, elapsed = 0) {
        this.total = total;
        this.elapsed = elapsed;
    }
}