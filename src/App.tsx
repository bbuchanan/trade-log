import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainNav from './Components/MainNav/MainNav';

const App: React.FC = () => {
  return (
    <div className="App">
      <MainNav />
    </div>
  );
}

export default App;
