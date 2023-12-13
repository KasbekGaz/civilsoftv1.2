import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ObraForm from './components/ObraForm';
import UpdateObraForm from './components/UpdateObraForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-obra" element={<ObraForm />} />
        <Route path="/update-obra/:id" element={<UpdateObraForm />} />
      </Routes>
    </Router>
  );
};

export default App;

