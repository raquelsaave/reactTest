import React from 'react';

//Components
import Login from './Login/Login';
import Registro from './Registro/Registro';

// CSS
import './App.css';

function App() {
  const myName = 'Raquel';
  return (
    <div className="App">
      <Login name={myName} />
    <Registro />
    </div>
  );
}

export default App;
