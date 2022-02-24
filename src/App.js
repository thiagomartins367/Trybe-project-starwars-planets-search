import React from 'react';
import './App.css';
import Table from './Components/Table';
import ContextProvider from './Context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <Table />
    </ContextProvider>
  );
}

export default App;
