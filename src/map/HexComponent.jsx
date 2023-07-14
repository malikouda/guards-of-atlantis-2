import {Hex} from './Hex';
import {Layout} from './Layout';
import {Orientation} from './Orientation';
import {Point} from './Point';

export function HexComponent({q, r, s}) {
  const hex = new Hex(q, r, s);
  const layout = new Layout(Orientation.flat(), new Point(15, 15), new Point(150, 150));
  const points = Hex.polygon_corners(layout, hex);
  const polygon_points = points.map((p) => `${p.x},${p.y}`).join(' ');
  return (
    <>
      <polygon points={polygon_points} fill="none" stroke="black" />
      <text x={points[0].x - 15} y={points[0].y} fontSize="6" fill="black" textAnchor="middle">
        {hex.q === 0 && hex.r === 0 && hex.s === 0 ? 'q,r,s' : `${q},${r},${s}`}
      </text>
    </>
  );
}
export default HexComponent;
