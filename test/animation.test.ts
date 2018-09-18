import * as test from 'tape';
import { circularOrbit, constant, lerpColor, sinOsc, toPercentage } from '../src/animation';
import { color, position, time } from '../src/types';
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

test('Percentage conversion', (t) => {
    let fn = toPercentage(0, 200);

    t.equal(fn(200), 1, 'should convert max val to 1');
    t.equal(fn(0), 0, 'should convert min val to 0');
    t.equal(fn(100), 0.5, 'should convert half val to 0.5');
    t.equal(fn(-10), 0, 'should convert less-than-min to 0');
    t.equal(fn(300), 1, 'should convert more-than-max to 1');

    fn = toPercentage(-1, 1);
    t.equal(fn(-1), 0, 'should convert non-zero min val to 0');
    t.equal(fn(1), 1, 'should convert non-zero max val to 1');
    t.equal(fn(-0.5), 0.25, 'should convert non-zero mid val');
    t.end();
});

test('Color interpolation', (t) => {
    const startColor = color(200, 0, 200, 0);
    const endColor = color(0, 200, 0, 1);

    const interp = lerpColor(startColor, endColor)(0.5);
    t.equal(interp.r, 100, 'should interpolate red channel');
    t.equal(interp.g, 100, 'should interpolate green channel');
    t.equal(interp.b, 100, 'should interpolate blue channel');
    t.equal(interp.a, 0.5, 'should interpolate alpha channel');
    t.end();
});
