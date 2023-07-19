import {useState} from "react";

import {Hex} from "./Hex";
import {Layout} from "./Layout";
import {Orientation} from "./Orientation";
import {Point} from "./Point";

export function HexComponent({q, r, s, zoneColor}) {
  const [isHovered, setIsHovered] = useState(false);
  const hex = new Hex(q, r, s);
  const layout = new Layout(
    Orientation.flat(),
    new Point(15, 15),
    new Point(0, 0),
  );
  const points = Hex.polygonCorners(layout, hex);
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const handleHoverEvent = (e) => {
    setIsHovered(!isHovered);
  };
  return (
    <>
      <polygon
        points={polygonPoints}
        fill={zoneColor}
        stroke="black"
        strokeWidth=".5"
        onMouseEnter={handleHoverEvent}
        onMouseLeave={handleHoverEvent}
      />
      {/* <text
        x={points[0].x - 15}
        y={points[0].y}
        fontSize="6"
        fill="black"
        textAnchor="middle"
        pointerEvents="none"
      >
        {hex.q === 0 && hex.r === 0 && hex.s === 0 ? "q,r,s" : `${q},${r},${s}`}
      </text> */}
    </>
  );
}
export default HexComponent;
