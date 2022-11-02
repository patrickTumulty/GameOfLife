
import './css/App.css';
import GameOfLife from "./GameOfLife";


function App() {
    return (
        <div className="App">
            <GameOfLife cols={70} rows={50}/>
        </div>
    );
}

export default App;
