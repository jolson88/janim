import * as test from 'tape';
import { position, size, time } from './janim';

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
