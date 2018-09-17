/**
 * Compares two floating points numbers to determine if they should be considered
 * equal or not. This is done using a bias factor that the value is compared to be within the
 * range of.
 * @param val The value to compare against
 * @param expected The expected value
 */
export function nearEqual(val: number, expected: number): boolean {
    return (val > expected - 0.001) && (val < expected + 0.001);
}
