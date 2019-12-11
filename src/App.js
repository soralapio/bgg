import React from 'react';
import './App.css';
import BoardgameList from './Components/BoardgameList/BoardgameList.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h4>BoardgameGeek Visualizer v0.3</h4>
      </div>
      <div className="App-body">
        <BoardgameList/>
      </div>
    </div>
  );
}

export default App;
