import {Point} from './Point';

export class Hex {
  constructor(q, r, s) {
    console.assert(q + r + s === 0, 'Invalid hex coordinates');
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
    console.assert(0 <= direction && direction < 6, 'Direction must be between 0 and 5');
    return this.DIRECTIONS[direction];
  }

  static neighbor(hex, direction) {
    return this.add(hex, this.direction(direction));
  }

  static to_pixel(layout, hex) {
    const o = layout.orientation;
    const x = (o.f0 * hex.q + o.f1 * hex.r) * layout.size.x;
    const y = (o.f2 * hex.q + o.f3 * hex.r) * layout.size.y;
    return new Point(x + layout.origin.x, y + layout.origin.y);
  }

  static to_hex(layout, point) {
    const o = layout.orientation;
    const pt = Point((point.x - layout.origin.x) / layout.size.x, (point.y - layout.origin.y) / layout.size.y);
    const q = o.b0 * pt.x + o.b1 * pt.y;
    const r = o.b2 * pt.x + o.b3 * pt.y;
    return new Hex(q, r, -q - r);
  }

  static corner_offset(layout, corner) {
    const size = layout.size;
    const angle = 2.0 * Math.PI * (layout.orientation.start_angle + corner) / 6;
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }

  static polygon_corners(layout, hex) {
    let corners = [];
    const center = this.to_pixel(layout, hex);
    for (let i = 0; i < 6; i++) {
      const offset = this.corner_offset(layout, i);
      corners.push(new Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
  }
}
export default Hex;
