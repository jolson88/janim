import * as test from 'tape';
import { makeColor, makeTime, toCssColor } from '../src/types';

test('Colors', (t) => {
    const r = 120;
    const g = 121;
    const b = 122;
    const a = 0.5;

    let c = makeColor(r, g, b, 0.5);
    t.equal(c.r, r, 'should set red channel');
    t.equal(c.g, g, 'should set green channel');
    t.equal(c.b, b, 'should set blue channel')
    t.equal(c.a, 0.5, 'should set alpha channel');
    t.equal(toCssColor(c), `rgba(${r}, ${g}, ${b}, ${a})`, 'should convert to CSS color string');

    c = makeColor(r, g, b);
    t.equal(c.a, 1, 'should default alpha to 1');
    t.end();
});

test('Time', (t) => {
    const total = 1200;
    const elapsed = 16;

    let time = makeTime(total, elapsed);
    t.equal(time.total, total, 'should set total time');
    t.equal(time.elapsed, elapsed, 'should set elapsed time');

    time = makeTime(total);
    t.equal(time.elapsed, 0, 'should default elapsed time to 0');
    t.end();
});
