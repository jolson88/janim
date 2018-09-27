import * as R from 'ramda';
import { Behavior, Function, Time } from './janim';

interface IReactiveEventInstance<T> {
    time: Time;
    value: T;
}

/**
 * A function representing event instances over time. Returns all event instances before time t.
 */
export type ReactiveEvent<T> = (t: Time) => Array<IReactiveEventInstance<T>>;

/**
 * Handles an event by converting it to an event of behaviors for switching and stepping functionality
 * @param e The event to handle
 * @param fn Function that is passed event instance data and returns handling of the event as a behavior
 */
export function handle<T, U>(e: ReactiveEvent<T>, fn: Function<T, Behavior<U>>): ReactiveEvent<Behavior<U>> {
    return (t) => {
        return R.map((ei: IReactiveEventInstance<T>) => {
            return { time: ei.time, value: fn(ei.value) };
        }, e(t));
    };
}

/**
 * Creates an event that has an occurrence at a given time
 * @param time The time that the event occurs
 */
export function timeIs(time: Time): ReactiveEvent<Time> {
    return (t) => {
        return (time < t) ? [{ time, value: time }] : [];
    };
}
