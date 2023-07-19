import {Hex} from "./Hex";
import {HexComponent} from "./HexComponent";
import {Zones} from "./Zones";

export function HexGrid() {
  const hexes = [];
  for (let q = -11; q <= 10; q++) {
    const qOffset = Math.floor(q / 2.0);
    for (let r = -8 - qOffset; r <= 8 - qOffset; r++) {
      const s = -q - r;
      hexes.push(new Hex(q, r, s));
    }
  }
  const mapHexToColor = (hex) => {
    const key = `${hex.q},${hex.r},${hex.s}`;
    for (let zone of Object.keys(Zones)) {
      if (Zones[zone].hexes.includes(key)) {
        return Zones[zone].color;
      } else {
        const columns = Zones[zone].columns;
        const column = columns.find(
          (col) =>
            hex.q === col.q && hex.r >= col.r.start && hex.r <= col.r.end,
        );
        if (column) {
          return Zones[zone].color;
        }
      }
    }
    return "transparent";
  };
  return (
    <g>
      {hexes.map((hex) => (
        <HexComponent
          zoneColor={mapHexToColor(hex)}
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
