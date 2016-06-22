///////////////////////////////////////////////////////////////////////////////
// Utility
///////////////////////////////////////////////////////////////////////////////
const ε = 1e-6;
const approx = (x, y) => Math.abs(x - y) < ε;

///////////////////////////////////////////////////////////////////////////////
// Scalar
///////////////////////////////////////////////////////////////////////////////
export function S (s) {
  if (!(this instanceof S)) { return new S(s); }

  this.s = s;
}
S.times = (s, v) => V2(s.s * v.dx, s.s * v.dy);

S.prototype.times = function (v) { return S.times(this, v); };

///////////////////////////////////////////////////////////////////////////////
// Point
///////////////////////////////////////////////////////////////////////////////
export function P2 (x, y) {
  if (!(this instanceof P2)) { return new P2(x, y); }

  this.x = x;
  this.y = y;
}
P2.origin   = new P2(0, 0);
P2.approx   = (p1, p2) => approx(p1.x, p2.x) && approx(p1.y, p2.y);
P2.equals   = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
P2.offset   = (p, v)   => P2(p.x + v.dx, p.y + v.dy);
P2.distance = (p1, p2) => V2.magnitude(V2.fromTo(p1, p2));

P2.prototype.equals     = function (p2) { return P2.equals(this, p2);   };
P2.prototype.offset     = function (v)  { return P2.offset(this, v);    };
P2.prototype.getOffset  = function (p2) { return V2.fromTo(p2, this);   };
P2.prototype.distance   = function (p2) { return P2.distance(this, p2); };

///////////////////////////////////////////////////////////////////////////////
// Vector
///////////////////////////////////////////////////////////////////////////////
export function V2 (dx, dy) {
  if (!(this instanceof V2)) { return new V2(dx, dy); }

  this.dx = dx;
  this.dy = dy;
}
V2.x    = new V2(1, 0);
V2.y    = new V2(0, 1);
V2.zero = new V2(0, 0);

V2.equals    = (v1, v2) => v1.dx === v2.dx && v1.dy === v2.dy;
V2.approx    = (v1, v2) => approx(v1.dx, v2.dx) && approx(v1.dy, v2.dy);
V2.add       = (v1, v2) => V2(v1.dx + v2.dx, v1.dy + v2.dy);
V2.subtract  = (v1, v2) => V2(v1.dx - v2.dx, v1.dy - v2.dy);
V2.scale     = (v, s)   => V2(s * v.dx, s * v.dy);
V2.dot       = (v1, v2) => v1.dx * v2.dx + v1.dy * v2.dy;
V2.magnitude = (v)      => Math.sqrt(V2.dot(v, v));
V2.unit      = (v)      => {
  const mag = V2.magnitude(v);
  if (mag === 0) { return V2.zero; }
  return V2(v.dx / mag, v.dy / mag);
};
V2.fromTo = (p1, p2) => V2(p2.x - p1.x, p2.y - p1.y);
V2.rotate = (v, r) => {
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return V2(v.dx * cos - v.dy * sin, v.dx * sin + v.dy * cos);
};
V2.fromRotation = (r) => {
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return new V2(cos, sin);
};

V2.prototype.equals    = function (v2) { return V2.equals(this, v2);   };
V2.prototype.plus      = function (v2) { return V2.add(this, v2);      };
V2.prototype.minus     = function (v2) { return V2.subtract(this, v2); };
V2.prototype.times     = function (s)  { return V2.scale(this, s);     };
V2.prototype.dot       = function (v2) { return V2.dot(this, v2);      };
V2.prototype.magnitude = function ()   { return V2.magnitude(this);    };
V2.prototype.normalize = function ()   { return V2.unit(this);         };
V2.prototype.rotate    = function (s)  { return V2.rotate(this, s);    };
