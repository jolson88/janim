import { Function, Time } from './types';

/**
 * An oscillator that uses the sin function to calculate its values
 * @param cycleLength The time in milliseconds until the oscillator repeats
 * @returns A function that accepts the time properties of a sketch and returns a value in the range of [-1..1]
 */
export function sinOsc(cycleLength: number): Function<Time, number> {
    return (time) => {
        const phase = (time.total % cycleLength) / cycleLength;
        return Math.sin(2 * Math.PI * phase);
    };
}
