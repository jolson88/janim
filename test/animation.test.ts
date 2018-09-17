import * as test from 'tape';
import { nearEqual } from './helpers';
import { makeTime } from '../src/types';
import { sinOsc } from '../src/animation';

test('Sine Oscillation', (t) => {
    let fn = sinOsc(1000);
    t.equal(fn(makeTime(250)), 1, 'should reach max val of oscillator');
    t.equal(fn(makeTime(750)), -1, 'should reach min val of oscillator');
    t.ok(nearEqual(fn(makeTime(1500)), 0), 'should repeat for times greater than cycle length');
    t.end();
});
