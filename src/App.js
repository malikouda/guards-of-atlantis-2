import HexGrid from './map/HexGrid';
import './App.css'

function App() {
  return (
    <div className='exactCenter'>
      <svg align="center" viewBox="-250 -250 500 500" xmlns="http://www.w3.org/2000/svg">
      <HexGrid />
      </svg>
    </div>
  );
}

export default App;
