/* globals describe, check, gen */
import {V2, P2, S} from '../src/affine';
import {install}   from 'mocha-testcheck';
import assert      from 'assert';

install();

// Utility:
const ε = 1e-6;
const approx = (x, y) => Math.abs(x - y) < ε;

// Generators:
gen.number = gen.map((
  {n,d}) => n/d,
  gen.object({n: gen.int, d: gen.strictPosInt})
);
gen.s = gen.map(
  S,
  gen.number
);
gen.v2 = gen.map(
  ({x,y}) => V2(x,y),
  gen.object({x: gen.number, y: gen.number})
);
gen.p2 = gen.map(
  ({x,y}) => P2(x,y),
  gen.object({x: gen.number, y: gen.number})
);
gen.v2nonZero = gen.suchThat(
  (v) => !v.equals(V2.zero),
  gen.v2
);

// Tests
describe('points', () => {
  check.it('equivalence', [gen.p2], (p) => {
    assert(p.equals(p));
  });
  describe('addition', () => {
    check.it('identity', [gen.p2], (p) => {
      const p2 = p.offset(V2.zero);
      assert(p2.equals(p));
    });
    check.it('associativitiy', [gen.p2, gen.v2, gen.v2], (p, v1, v2) => {
      const p2 = p.offset(v1).offset(v2);
      const p3 = p.offset(v1.plus(v2));
      assert(P2.approx(p2, p3));
    });
  });
});

describe('vectors', () => {
  check.it('equivalence', [gen.v2], (v) => {
    assert(V2.equals(v, v));
  });
  describe('addition', () => {
    check.it('identity (left)', [gen.v2], (v) => {
      const v2 = V2.zero.plus(v);
      assert(V2.equals(v2, v));
    });
    check.it('identity (right)', [gen.v2], (v) => {
      const v2 = v.plus(V2.zero);
      assert(V2.equals(v2, v));
    });
    check.it('inverse', [gen.v2], (v) => {
      const v2 = v.minus(v);
      assert(V2.equals(v2, V2.zero));
    });
  });

  describe('multiplication', () => {
    check.it('identity', [gen.v2], (v) => {
      const v2 = v.times(1);
      assert(V2.equals(v2, v));
    });
    check.it('zero', [gen.v2], (v) => {
      const v2 = v.times(0);
      assert(V2.equals(v2, V2.zero));
    });
    check.it('associativitiy', [gen.number, gen.number, gen.v2], (s1, s2, v) => {
      const v1 = v.times(s1).times(s2);
      const v2 = v.times(s1 * s2);
      assert(V2.approx(v1, v2));
    });
  });

  describe('distributivity', () => {
    check.it('scalar addition', [gen.number, gen.number, gen.v2], (s1, s2, v) => {
      const v1 = v.times(s1 + s2);
      const v2 = v.times(s1).plus(v.times(s2));
      assert(V2.approx(v1, v2));
    });
    check.it('vector addition', [gen.number, gen.v2, gen.v2], (s, v1, v2) => {
      const v3 = v1.plus(v2).times(s);
      const v4 = v1.times(s).plus(v2.times(s));
      assert(V2.approx(v3, v4));
    });
  });

  describe('normalization', () => {
    check.it('magnitude zero', [], () => {
      assert(V2.zero.magnitude() === 0);
    });
    check.it('magnitude non-zero', [gen.v2nonZero], (v) => {
      assert(v.magnitude() > 0);
    });
    check.it('distributivity', [gen.number, gen.v2], (s, v) => {
      const m1 = v.times(s).magnitude();
      const m2 = v.magnitude() * Math.abs(s);
      assert(approx(m1, m2));
    });
    check.it('triangle inequality', [gen.v2, gen.v2], (v1, v2) => {
      const m1 = v1.plus(v2).magnitude();
      const m2 = v1.magnitude() + v2.magnitude();
      assert(m1 <= m2);
    });
  });
});
