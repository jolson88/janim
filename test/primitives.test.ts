import * as test from 'tape';
import { color, position, size, time, toCssColor } from '../src/types';

test('Colors', (t) => {
    const r = 120;
    const g = 121;
    const b = 122;
    const a = 0.5;

    let c = color(r, g, b, 0.5);
    t.equal(c.r, r, 'should set red channel');
    t.equal(c.g, g, 'should set green channel');
    t.equal(c.b, b, 'should set blue channel');
    t.equal(c.a, 0.5, 'should set alpha channel');
    t.equal(toCssColor(c), `rgba(${r}, ${g}, ${b}, ${a})`, 'should convert to CSS color string');

    c = color(r, g, b);
    t.equal(c.a, 1, 'should default alpha to 1');
    t.end();
});

test('Time', (t) => {
    const total = 1200;
    const elapsed = 16;

    let curTime = time(total, elapsed);
    t.equal(curTime.total, total, 'should set total time');
    t.equal(curTime.elapsed, elapsed, 'should set elapsed time');

    curTime = time(total);
    t.equal(curTime.elapsed, 0, 'should default elapsed time to 0');
    t.end();
});

test('Size', (t) => {
    const s = size(200, 200);
    t.equal(s.width, 200, 'should capture width');
    t.equal(s.height, 200, 'should capture height');
    t.end();
});

test('Position', (t) => {
    const p = position(200, 200);
    t.equal(p.x, 200, 'should capture x coord');
    t.equal(p.y, 200, 'should capture y coord');
    t.end();
});
