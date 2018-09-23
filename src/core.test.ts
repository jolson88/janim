import * as test from 'tape';
import { position, size } from './janim';

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
