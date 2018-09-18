import * as test from 'tape';
import { circularOrbit, constant, sinOsc } from '../src/animation';
import { position, time } from '../src/types';
import { nearEqual } from './helpers';

test('Sine oscillation', (t) => {
    const fn = sinOsc(1000);
    t.equal(fn(time(250)), 1, 'should reach max val of oscillator');
    t.equal(fn(time(750)), -1, 'should reach min val of oscillator');
    t.ok(nearEqual(fn(time(1500)), 0), 'should repeat for times greater than cycle length');
    t.end();
});

test('Constant returns', (t) => {
    const c: any = constant(1);
    t.equal(c(2), 1, 'should return constant value on first call');
    t.equal(c('string'), 1, 'should return constant value on successive calls');
    t.end();
});

test('Circular orbit', (t) => {
    const center = position(100, 200);
    const radius = 10;
    const duration = 1000;
    const orbit = circularOrbit(constant(center), constant(radius), duration);

    let p = orbit(time(0, 0));
    t.equal(p.x, 100, 'should have initial orbit x coord');
    t.equal(p.y, 210, 'should have initial orbit y coord');
    p = orbit(time(250, 0));
    t.equal(p.x, 110, 'x coord should change on orbit');
    t.equal(p.y, 200, 'y coord should change on orbit');
    t.end();
});
