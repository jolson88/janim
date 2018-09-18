import * as test from 'tape';
import { lerpColor, toPercentage } from '../src/interpolation';
import { color } from '../src/types';

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
