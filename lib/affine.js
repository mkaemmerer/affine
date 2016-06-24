"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S = S;
exports.P2 = P2;
exports.V2 = V2;
///////////////////////////////////////////////////////////////////////////////
// Utility
///////////////////////////////////////////////////////////////////////////////
var ε = 1e-6;
var approx = function approx(x, y) {
  return Math.abs(x - y) < ε;
};

///////////////////////////////////////////////////////////////////////////////
// Scalar
///////////////////////////////////////////////////////////////////////////////
function S(s) {
  if (!(this instanceof S)) {
    return new S(s);
  }

  this.s = s;
}
S.times = function (s, v) {
  return V2(s.s * v.dx, s.s * v.dy);
};

S.prototype.times = function (v) {
  return S.times(this, v);
};

///////////////////////////////////////////////////////////////////////////////
// Point
///////////////////////////////////////////////////////////////////////////////
function P2(x, y) {
  if (!(this instanceof P2)) {
    return new P2(x, y);
  }

  this.x = x;
  this.y = y;
}
P2.origin = new P2(0, 0);
P2.approx = function (p1, p2) {
  return approx(p1.x, p2.x) && approx(p1.y, p2.y);
};
P2.equals = function (p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
};
P2.offset = function (p, v) {
  return P2(p.x + v.dx, p.y + v.dy);
};

P2.prototype.equals = function (p2) {
  return P2.equals(this, p2);
};
P2.prototype.offset = function (v) {
  return P2.offset(this, v);
};
P2.prototype.getOffset = function (p2) {
  return V2.fromTo(p2, this);
};

///////////////////////////////////////////////////////////////////////////////
// Vector
///////////////////////////////////////////////////////////////////////////////
function V2(dx, dy) {
  if (!(this instanceof V2)) {
    return new V2(dx, dy);
  }

  this.dx = dx;
  this.dy = dy;
}
V2.x = new V2(1, 0);
V2.y = new V2(0, 1);
V2.zero = new V2(0, 0);

V2.equals = function (v1, v2) {
  return v1.dx === v2.dx && v1.dy === v2.dy;
};
V2.approx = function (v1, v2) {
  return approx(v1.dx, v2.dx) && approx(v1.dy, v2.dy);
};
V2.add = function (v1, v2) {
  return V2(v1.dx + v2.dx, v1.dy + v2.dy);
};
V2.subtract = function (v1, v2) {
  return V2(v1.dx - v2.dx, v1.dy - v2.dy);
};
V2.scale = function (v, s) {
  return V2(s * v.dx, s * v.dy);
};
V2.dot = function (v1, v2) {
  return v1.dx * v2.dx + v1.dy * v2.dy;
};
V2.magnitude = function (v) {
  return Math.sqrt(V2.dot(v, v));
};
V2.unit = function (v) {
  var mag = V2.magnitude(v);
  if (mag === 0) {
    return V2.zero;
  }
  return V2(v.dx / mag, v.dy / mag);
};
V2.fromTo = function (p1, p2) {
  return V2(p2.x - p1.x, p2.y - p1.y);
};
V2.rotate = function (v, r) {
  var cos = Math.cos(r);
  var sin = Math.sin(r);
  return V2(v.dx * cos - v.dy * sin, v.dx * sin + v.dy * cos);
};
V2.fromRotation = function (r) {
  var cos = Math.cos(r);
  var sin = Math.sin(r);
  return new V2(cos, sin);
};

V2.prototype.equals = function (v2) {
  return V2.equals(this, v2);
};
V2.prototype.plus = function (v2) {
  return V2.add(this, v2);
};
V2.prototype.minus = function (v2) {
  return V2.subtract(this, v2);
};
V2.prototype.times = function (s) {
  return V2.scale(this, s);
};
V2.prototype.dot = function (v2) {
  return V2.dot(this, v2);
};
V2.prototype.magnitude = function () {
  return V2.magnitude(this);
};
V2.prototype.normalize = function () {
  return V2.unit(this);
};
V2.prototype.rotate = function (s) {
  return V2.rotate(this, s);
};