import {Hex} from "./Hex";
import {HexComponent} from "./HexComponent";

export function HexGrid() {
  const hexes = [];
  for (let i = -5; i < 6; i++) {
    for (let j = -5; j < 6; j++) {
      if (-i - j >= 6 || -i - j <= -6) {
        continue;
      }
      hexes.push(new Hex(i, j, -i - j));
    }
  }
  const line = Hex.lineDraw(hexes[5], hexes[30])
  console.log(line)
  const checkHexInLine = (hex) => {
    for (let h of line) {
      if (hex.q === h.q && hex.r === h.r && hex.s === h.s) {
        return true
      }
    }
    return false
  }
  return (
    <g>
      {hexes.map((hex) => (
        <HexComponent
          highlight={checkHexInLine(hex)}
          key={`${hex.q} ${hex.r} ${hex.s}`}
          q={hex.q}
          r={hex.r}
          s={hex.s}
        />
      ))}
    </g>
  );
}

export default HexGrid;
