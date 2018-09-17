import { Function } from "./types";

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
