import * as R from 'ramda';
import * as test from 'tape';
import {
    changeSpeed,
    color,
    colorRotate,
    constant,
    cos,
    earlier,
    later,
    liftA2,
    orbit,
    position,
    positionAdd,
    sin,
    time,
    triangle,
} from './janim';
import { nearEqual } from './testHelpers';

test('Constant returns', (t) => {
    const c: any = constant(1);
    t.equal(c(2), 1, 'should return constant value on first call');
    t.equal(c('string'), 1, 'should return constant value on successive calls');
    t.end();
});

test('Period function behaviors', (t) => {
    t.ok(nearEqual(sin(0), 0), 'sin at 0%');
    t.ok(nearEqual(sin(250), 1), 'sin at 25%');
    t.ok(nearEqual(sin(500), 0), 'sin at 50%');
    t.ok(nearEqual(sin(750), -1), 'sin at 75%');
    t.ok(nearEqual(sin(1000), 0), 'sin at 100%');
    t.ok(nearEqual(cos(0), 1), 'cos at 0%');
    t.ok(nearEqual(cos(250), 0), 'cos at 25%');
    t.ok(nearEqual(cos(500), -1), 'cos at 50%');
    t.ok(nearEqual(cos(750), 0), 'cos at 75%');
    t.ok(nearEqual(cos(1000), 1), 'cos at 100%');
    t.ok(nearEqual(triangle(0), 1), 'triangle at 0%');
    t.ok(nearEqual(triangle(125), 0.5), 'triangle at 12.5%');
    t.ok(nearEqual(triangle(250), 0), 'triangle at 25%');
    t.ok(nearEqual(triangle(375), -0.5), 'triangle at 37.5%');
    t.ok(nearEqual(triangle(500), -1), 'triangle at 50%');
    t.ok(nearEqual(triangle(625), -0.5), 'triangle at 62.5%');
    t.ok(nearEqual(triangle(750), 0), 'triangle at 75%');
    t.ok(nearEqual(triangle(875), 0.5), 'triangle at 87.5%');
    t.ok(nearEqual(triangle(1000), 1), 'triangle at 100%');
    t.end();
});

test('Interpolation behaviors', (t) => {
    const red = color(240, 0, 0);
    const green = color(0, 240, 0);
    const ic = colorRotate(constant(red), constant(green));
    t.deepEqual(ic(0), red, 'interp color at 0%');
    t.deepEqual(ic(250), color(120, 120, 0), 'interp color at 25%');
    t.deepEqual(ic(500), green, 'interp color at 50%');
    t.deepEqual(ic(750), color(120, 120, 0), 'interp color at 75%');
    t.deepEqual(ic(1000), red, 'interp color at 100%');
    t.end();
});

test('Lifting', (t) => {
    const fn = liftA2(R.add, sin, cos);
    t.ok(nearEqual(fn(0), 1), 'lifted at time 0');
    t.ok(nearEqual(fn(250), 1), 'lifted at time 500');
    t.ok(nearEqual(fn(500), -1), 'lifted at time 1000');
    t.ok(nearEqual(fn(750), -1), 'lifted at time 1500');
    t.end();
});

test('Time Transforms', (t) => {
    let fn = changeSpeed(0.5, time);
    t.equal(fn(500), 250, 'transform to slower time');
    t.equal(fn(1000), 500, 'transform to slower time');

    fn = changeSpeed(2, time);
    t.equal(fn(500), 1000, 'transform to faster time');
    t.equal(fn(1000), 2000, 'transform to faster time');

    fn = later(0.5, time);
    t.equal(fn(1000), 1500, 'transform to later time');
    t.equal(fn(200), 700, 'transform to later time');

    fn = earlier(0.5, time);
    t.equal(fn(1000), 500, 'transform to earlier time');
    t.equal(fn(200), -300, 'transform to earlier time');
    t.end();
});

test('Positions', (t) => {
    const p1 = constant(position(10, 10));
    const p2 = constant(position(20, 20));
    const add = positionAdd(p1, p2);

    const p = add(0);
    t.equal(p.x, 30, 'should add x coord');
    t.equal(p.y, 30, 'should add y coord');
    t.end();
});

test('Orbits', (t) => {
    const center = position(100, 200);
    const radius = 10;
    const fn = orbit(constant(center), constant(radius));

    let p = fn(0);
    t.equal(p.x, 100, 'should have initial orbit x coord');
    t.equal(p.y, 210, 'should have initial orbit y coord');
    p = fn(250);
    t.equal(p.x, 110, 'x coord should change on orbit');
    t.equal(p.y, 200, 'y coord should change on orbit');
    t.end();
});
