/**
 * A simple unary function
 */
export type Function<T, U> = (arg: T) => U;

/**
 * A function for setting the style of an animated shape
 */
export type StyleFunction = (ctx: CanvasRenderingContext2D, t: ITime) => void;

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
 * A JAnim Sketch
 */
export interface ISketch {
    /** Stop running this sketch */
    stop: () => void;
}
