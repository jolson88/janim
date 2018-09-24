import * as test from 'tape';
import { color, toCssColor } from './janim';

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
