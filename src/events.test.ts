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
    const ei = eb(3001);
    t.equal(ei.length, 1, 'handle mapped');
    t.equal(R.last(ei).value(null), 'foo', 'handle behavior can be used');
    t.end();
});
