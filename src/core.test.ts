import * as test from 'tape';
import { position, size, toPercentage } from './janim';

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
