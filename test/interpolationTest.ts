import * as test from "tape";
import { toPercentage } from "../src/interpolation";

test("Percentage conversion", (t) => {
    let fn = toPercentage(0, 200);

    // In-range values
    t.equal(fn(200), 1);
    t.equal(fn(0), 0);
    t.equal(fn(100), 0.5);

    // Out-of-range values
    t.equal(fn(-10), 0);
    t.equal(fn(300), 1);

    // Ranges including negative values
    fn = toPercentage(-1, 1);
    t.equal(fn(-1), 0);
    t.equal(fn(1), 1);
    t.equal(fn(0), 0.5);
    t.equal(fn(-0.5), 0.25);
    t.end();
});
