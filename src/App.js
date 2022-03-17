import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Tasks } from './Components/Tasks';
import { Main } from './Routes/Main';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='/list/:listsid' element={<Tasks />} />
        <Route path='/colection/today' element={<Tasks />} />
      </Route>
    </Routes>
  );
}

export default App;