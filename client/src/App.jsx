import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

import ObraForm from './components/ObraForm';
import UpdateObraForm from './components/UpdateObraForm';
import DetallesObra from './views/DetallesObra';

import TareaView from './views/TareaView';


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-obra" element={<ObraForm />} />
        <Route path="/update-obra/:id" element={<UpdateObraForm />} />

        <Route path="/details-obra/:id" element={<DetallesObra />} />

        <Route path="/details-tarea/:id" element={<TareaView />} />

        
      </Routes>
    </Router>
  );
};

export default App;

