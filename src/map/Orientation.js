export class Orientation {
  constructor(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
    this.f0 = f0;
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    this.b0 = b0;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.start_angle = start_angle;
  }

  static pointy() {
    return new Orientation(
      Math.sqrt(3.0),
      Math.sqrt(3.0) / 2.0,
      0.0,
      3.0 / 2.0,
      Math.sqrt(3.0) / 3.0,
      -1.0 / 3.0,
      0.0,
      2.0 / 3.0,
      0.5,
    );
  }

  static flat() {
    return new Orientation(
      3.0 / 2.0,
      0.0,
      Math.sqrt(3.0) / 2.0,
      Math.sqrt(3.0),
      2.0 / 3.0,
      0.0,
      -1.0 / 3.0,
      Math.sqrt(3.0) / 3.0,
      0.0,
    );
  }
}

export default Orientation;
