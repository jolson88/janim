import * as R from 'ramda';
import * as test from 'tape';
import { constant, handle, switcher, timeIs } from './janim';

test('Timers', (t) => {
    const et = timeIs(3000);
    const before = et(2000);
    const after = et(3001);
    t.equal(before.length, 0, 'occurrences before time');
    t.equal(after.length, 1, 'occurrences after time');
    t.end();
});

test('Handlers', (t) => {
    const e = timeIs(3000);
    const b = constant('foo');
    const eb = handle(e, R.always(b));
    const occ = eb(3001);
    t.equal(occ.length, 1, 'handle mapped');
    t.equal(R.last(occ).value(null), 'foo', 'handle behavior invokeable');
    t.end();
});

test('Behavior switching', (t) => {
    const e = timeIs(3000);
    const b1 = constant('foo');
    const b2 = constant('bar');
    const s = switcher(b1, handle(e, R.always(b2)));
    t.equal(s(2999), 'foo', 'switch uses initial behavior');
    t.equal(s(3001), 'bar', 'switch uses event behavior');
    t.end();
});
