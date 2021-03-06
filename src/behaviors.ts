import * as R from 'ramda';
import {
    color,
    Function2,
    Function3,
    Function4,
    IColor,
    IPosition,
    position,
    ReactiveEvent,
    Time,
    toPercentage,
} from './janim';

/**
 * A function representing a value that changes over time
 */
export type Behavior<T> = (time: Time) => T;

/**
 * Always return a constant value no matter what time it is
 * @param val Constant value to return
 */
export function constant<T>(val: T): Behavior<T> {
    return R.always(val);
}

/**
 * Creates a circular orbit that returns an orbital position at a given time
 * @param center A behavior that returns the center
 * @param radius A behavior that returns the radius
 * @returns A function that, given the time, returns the position at that time
 */
export function orbit(
    center: Behavior<IPosition>,
    radius: Behavior<number>,
): Behavior<IPosition> {
    return liftA4(
        (p, r, s, c) => {
            return position(p.x + (s * r), p.y + (c * r));
        },
        center,
        radius,
        sin,
        cos,
    );
}

/**
 * Adds two position behaviors together and returns a new behavior
 * @param firstPos The position to be added to
 * @param secondPos The position to add to the first position
 */
export function positionAdd(
    firstPos: Behavior<IPosition>,
    secondPos: Behavior<IPosition>,
): Behavior<IPosition> {
    return liftA2(
        (p1, p2) => {
            return position(p1.x + p2.x, p1.y + p2.y);
        },
        firstPos,
        secondPos,
    );
}

//
// *** Interpolation Behaviors ***
//
/**
 * Calculates an interpolated color between the start color and end color
 * @param start The color to start with
 * @param end The color to interpolate to
 * @param periodicFn A period function that returns values in the range -1...1
 * @returns Function that accepts an interpolation percentage between 0..1 and returns a color
 */
export function colorRotate(
    start: Behavior<IColor>,
    end: Behavior<IColor>,
    periodicFn: Behavior<number> = invert(triangle),
): Behavior<IColor> {
    return liftA3(
        (startColor, endColor, interp) => {
            const percent = toPercentage(-1, 1); // Converts from [-1...1] to [0...1]
            return color(
                startColor.r + ((endColor.r - startColor.r) * percent(interp)),
                startColor.g + ((endColor.g - startColor.g) * percent(interp)),
                startColor.b + ((endColor.b - startColor.b) * percent(interp)),
                startColor.a + ((endColor.a - startColor.a) * percent(interp)),
            );
        },
        start,
        end,
        periodicFn,
    );
}

//
// *** Composition Behaviors ***
//

/**
 * Lifts a two-argument non-behavior function into working with behaviors
 * @param fn The function to lift into working with behaviors
 * @param b1 The first behavior to pass
 * @param b2 The second behavior to pass
 * @returns A new behavior that gets the values for the behaviors and passes values to fn
 */
export function liftA2<T1, T2, U>(
    fn: Function2<T1, T2, U>,
    b1: Behavior<T1>,
    b2: Behavior<T2>,
): Behavior<U> {
    return (t) => {
        return fn(b1(t), b2(t));
    };
}

/**
 * Lifts a three-argument non-behavior function into working with behaviors
 * @param fn The function to lift into working with behaviors
 * @param b1 The first behavior to pass
 * @param b2 The second behavior to pass
 * @param b3 The third behavior to pass
 * @returns A new behavior that gets the values for the behaviors and passes values to fn
 */
export function liftA3<T1, T2, T3, U>(
    fn: Function3<T1, T2, T3, U>,
    b1: Behavior<T1>,
    b2: Behavior<T2>,
    b3: Behavior<T3>,
): Behavior<U> {
    return (t) => {
        return fn(b1(t), b2(t), b3(t));
    };
}

/**
 * Lifts a four-argument non-behavior function into working with behaviors
 * @param fn The function to lift into working with behaviors
 * @param b1 The first behavior to pass
 * @param b2 The second behavior to pass
 * @param b3 The third behavior to pass
 * @param b3 The fourth behavior to pass
 * @returns A new behavior that gets the values for the behaviors and passes values to fn
 */
export function liftA4<T1, T2, T3, T4, U>(
    fn: Function4<T1, T2, T3, T4, U>,
    b1: Behavior<T1>,
    b2: Behavior<T2>,
    b3: Behavior<T3>,
    b4: Behavior<T4>,
): Behavior<U> {
    return (t) => {
        return fn(b1(t), b2(t), b3(t), b4(t));
    };
}

/**
 * Switches between two behaviors based on an occurrence of an event
 * @param b The initial behavior to exhibit
 * @param e An event whose payload is a behavior that is switched to when the event occurs
 */
export function switcher<T1, T2>(b: Behavior<T1>, e: ReactiveEvent<Behavior<T2>>): Behavior<T1 | T2> {
    return (t) => {
        const ei = R.last(e(t));
        return (!R.isNil(ei)) ? ei.value(t) : b(t);
    };
}

//
// *** Time Behaviors ***
//

/**
 * A behavior representing the identity function of time
 */
export const time: Behavior<number> = R.identity;

/**
 * Slows down the rate at which time passes for a given behavior
 * @param speedFactor How much slower to make time pass (2 === twice as slow)
 * @param b The behavior to change time for
 */
export function slower<T>(
    speedFactor: number,
    b: Behavior<T>,
): Behavior<T> {
    return R.compose(b, R.multiply(1 / speedFactor));
}

/**
 * Speeds up the rate at which time passes for a given behavior
 * @param speedFactor How much faster time passes (2 === twice as fast)
 * @param b The behavior to change time for
 */
export function faster<T>(
    speedFactor: number,
    b: Behavior<T>,
): Behavior<T> {
    return R.compose(b, R.multiply(speedFactor));
}

/**
 * Causes a behavior to observe time as happening earlier than it does
 * @param sec The number of seconds earlier that time should be perceived as
 * @param b The behavior to change time for
 */
export function earlier<T>(
    sec: number,
    b: Behavior<T>,
): Behavior<T> {
    return R.compose(b, R.add(-sec * 1000)); // Add a neg number is cleaner than partialRight of subtract
}

/**
 * Causes a behavior to observe time as happening later than it does
 * @param sec The number of seconds later that time should be perceived as
 * @param b The behavior to change time for
 */
export function later<T>(
    sec: number,
    b: Behavior<T>,
): Behavior<T> {
    return R.compose(b, R.add(sec * 1000));
}

//
// *** Periodic Functions ***
//

/**
 * Behavior for the value of the cos function at a given time. Default period is 1 second
 */
export function cos(t: Time): number {
    const seconds = t / 1000;
    return Math.cos(2 * Math.PI * seconds);
}

/**
 * Behavior for the value of the sin function at a given time
 */
export function sin(t: Time): number {
    const seconds = t / 1000;
    return Math.sin(2 * Math.PI * seconds);
}

/**
 * Behavior for a triangle function value at a given time
 * Value at t(0) is 1 and t(500) is -1.
 */
export function triangle(t: Time): number {
    const period = 1000;
    return (Math.abs((t % period) - (period / 2)) - (period / 4)) / (period / 4);
}

/**
 * Inverts a period function so all positive values or negative and vice versa
 * @param fn The periodic function to invert
 */
export function invert(fn: Behavior<number>): Behavior<number> {
    return (t) => {
        return fn(t) * -1;
    };
}
