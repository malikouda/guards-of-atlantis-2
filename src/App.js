import HexGrid from "./map/HexGrid";
import "./App.css";

function App() {
  return (
    <div className="exactCenter">
      <svg
        viewBox="-400 -400 800 800"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(240 0 0)"
      >
        <HexGrid />
      </svg>
    </div>
  );
}

export default App;
