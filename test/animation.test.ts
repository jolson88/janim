import * as test from 'tape';
import { nearEqual } from './helpers';
import { Time } from '../src/types';
import { sinOsc } from '../src/animation';

test('Sine Oscillation', (t) => {
    let fn = sinOsc(1000);
    t.equal(fn(new Time(250)), 1, 'should reach max val of oscillator');
    t.equal(fn(new Time(750)), -1, 'should reach min val of oscillator');
    t.ok(nearEqual(fn(new Time(1500)), 0), 'should repeat for times greater than cycle length');
    t.end();
});
