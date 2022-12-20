import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { InputProvider } from './Contexts/ContextProvider';
import RouterComponent from './Components/Router';
import './App.css';

function App() {
  return (
    <>
      <InputProvider>
        <Router basename={''}>
          <RouterComponent />
        </Router>
      </InputProvider>
    </>
  );
}

export default App;