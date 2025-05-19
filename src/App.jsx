import Board from "./components/board";
import "./App.css";


function App() {
  return (
    <>
      <h1 className="tic-tac-toe">Tic Tac Toe</h1>
      <div className="game">
        <Board />
      </div>
    </>
  );
}

export default App;
