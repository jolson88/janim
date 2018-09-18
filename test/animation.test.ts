import * as test from 'tape';
import { constant, constantPosition, constantSize, sinOsc } from '../src/animation';
import { makeTime } from '../src/types';
import { nearEqual } from './helpers';

test('Sine Oscillation', (t) => {
    const fn = sinOsc(1000);
    t.equal(fn(makeTime(250)), 1, 'should reach max val of oscillator');
    t.equal(fn(makeTime(750)), -1, 'should reach min val of oscillator');
    t.ok(nearEqual(fn(makeTime(1500)), 0), 'should repeat for times greater than cycle length');
    t.end();
});

test('Constant returns', (t) => {
    let c: any = constant(1);
    t.equal(c(2), 1, 'should return constant value on first call');
    t.equal(c('string'), 1, 'should return constant value on successive calls');

    c = constantPosition(1, 2);
    const p1 = c(1);
    const p2 = c(2);
    t.equal(p1, p2, 'should return constant positions on successive calls');

    c = constantSize(100, 200);
    const c1 = c(1);
    const c2 = c(2);
    t.equal(c1, c2, 'should return constant size on successive calls');
    t.end();
});
