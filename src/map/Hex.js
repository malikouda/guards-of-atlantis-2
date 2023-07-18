import {Point} from "./Point";

export class Hex {
  constructor(q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;
  }

  static DIRECTIONS = [
    new Hex(1, 0, -1),
    new Hex(1, -1, 0),
    new Hex(0, -1, 1),
    new Hex(-1, 0, 1),
    new Hex(-1, 1, 0),
    new Hex(0, 1, -1),
  ];

  static equals(a, b) {
    return a.q === b.q && a.r === b.r && a.s === b.s;
  }

  static add(a, b) {
    return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
  }

  static subtract(a, b) {
    return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
  }

  static multiply(a, b) {
    return new Hex(a.q * b.q, a.r * b.r, a.s * b.s);
  }

  static length(hex) {
    return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
  }

  static distance(a, b) {
    return this.length(this.subtract(a, b));
  }

  static direction(direction) {
    console.assert(
      0 <= direction && direction < 6,
      "Direction must be between 0 and 5",
    );
    return this.DIRECTIONS[direction];
  }

  static neighbor(hex, direction) {
    return this.add(hex, this.direction(direction));
  }

  static toPixel(layout, hex) {
    const o = layout.orientation;
    const x = (o.f0 * hex.q + o.f1 * hex.r) * layout.size.x;
    const y = (o.f2 * hex.q + o.f3 * hex.r) * layout.size.y;
    return new Point(x + layout.origin.x, y + layout.origin.y);
  }

  static toHex(layout, point) {
    const o = layout.orientation;
    const pt = Point(
      (point.x - layout.origin.x) / layout.size.x,
      (point.y - layout.origin.y) / layout.size.y,
    );
    const q = o.b0 * pt.x + o.b1 * pt.y;
    const r = o.b2 * pt.x + o.b3 * pt.y;
    return new Hex(q, r, -q - r);
  }

  static cornerOffset(layout, corner) {
    const size = layout.size;
    const angle = 2.0 * Math.PI * (layout.orientation.start_angle + corner) / 6;
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }

  static polygonCorners(layout, hex) {
    let corners = [];
    const center = this.toPixel(layout, hex);
    for (let i = 0; i < 6; i++) {
      const offset = this.cornerOffset(layout, i);
      corners.push(new Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
  }

  static round(hex) {
    let q = Math.round(hex.q);
    let r = Math.round(hex.r);
    let s = Math.round(hex.s);
    const q_diff = Math.abs(q - hex.q);
    const r_diff = Math.abs(r - hex.r);
    const s_diff = Math.abs(s - hex.s);
    if (q_diff > r_diff && q_diff > s_diff) {
      q = -r - s;
    } else if (r_diff > s_diff) {
      r = -q - s;
    } else {
      s = -q - r;
    }
    return new Hex(q, r, s);
  }

  static lerp(a, b, t) {
    return a * (1 - t) + b * t;
  }

  static hexLerp(a, b, t) {
    return new Hex(
      this.lerp(a.q, b.q, t),
      this.lerp(a.r, b.r, t),
      this.lerp(a.s, b.s, t),
    );
  }

  static lineDraw(a, b) {
    const dist = this.distance(a, b);
    let results = [];
    const step = 1.0 / Math.max(dist, 1);
    for (let i = 0; i <= dist; i++) {
      results.push(this.round(this.hexLerp(a, b, step * i)));
    }
    return results;
  }
}
export default Hex;
