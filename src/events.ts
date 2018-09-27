import * as R from 'ramda';
import { Behavior, Function, Time } from './janim';

interface IJanimEventOccurrence<T> {
    time: Time;
    value: T;
}

export type JanimEvent<T> = (time: Time) => Array<IJanimEventOccurrence<T>>;

export function handle<T, U>(e: JanimEvent<T>, fn: Function<T, Behavior<U>>): JanimEvent<Behavior<U>> {
    return (t) => {
        return R.map((occ: IJanimEventOccurrence<T>) => {
            return { time: occ.time, value: fn(occ.value) };
        }, e(t));
    };
}

export function switcher<T1, T2>(b: Behavior<T1>, e: JanimEvent<Behavior<T2>>): Behavior<T1 | T2> {
    return (t) => {
        const occ = R.last(e(t));
        return (!R.isNil(occ)) ? occ.value(t) : b(t);
    };
}

export function timeIs(time: Time): JanimEvent<Time> {
    return (t) => {
        return (time < t) ? [{ time, value: time }] : [];
    };
}
