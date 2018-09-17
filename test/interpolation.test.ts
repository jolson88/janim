import * as test from 'tape';
import { toPercentage } from '../src/interpolation';

test('Percentage conversion', (t) => {
    let fn = toPercentage(0, 200);

    // In-range values
    t.equal(fn(200), 1, 'should convert max val to 1');
    t.equal(fn(0), 0, 'should convert min val to 0');
    t.equal(fn(100), 0.5, 'should convert half val to 0.5');

    // Out-of-range values
    t.equal(fn(-10), 0, 'should convert less-than-min to 0');
    t.equal(fn(300), 1, 'should convert more-than-max to 1');

    // Ranges including negative values
    fn = toPercentage(-1, 1);
    t.equal(fn(-1), 0, 'should convert non-zero min val to 0');
    t.equal(fn(1), 1, 'should convert non-zero max val to 1');
    t.equal(fn(-0.5), 0.25, 'should convert non-zero mid val');
    t.end();
});
