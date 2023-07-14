import {Hex} from './Hex';
import {HexComponent} from './HexComponent';

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
  return (
    <g>
      {hexes.map((hex) => (
        <HexComponent key={`${hex.q} ${hex.r} ${hex.s}`} q={hex.q} r={hex.r} s={hex.s} />
      ))}
    </g>
  );
}

export default HexGrid;
