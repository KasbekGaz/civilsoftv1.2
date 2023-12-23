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
import UpdateTarea from './components/Tarea/UpdateTarea';
import ControlAdmin from './views/ControlAdmin';
import UpdateGasto from './components/Gasto/UpdateGasto';


const App = () => {

  return (
    <Router>
      <Routes>
        < Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-obra" element={<ObraForm />} />
        <Route path="/update-obra/:id" element={<UpdateObraForm />} />
          {/* Vista de Aciones para una OBRA */}
        <Route path="/details-obra/:id" element={<DetallesObra />} />
          {/* Vista control de TAREAS */}
        <Route path="/details-tarea/:id" element={<TareaView />} />
        <Route path={"/update-tarea-by-obra/:obraId/:tareaId"} element={<UpdateTarea />} />
        {/* Vista de control GASTOS */}
        <Route path={"/control-gastos/:id"} element={<ControlAdmin/>} />
        <Route path="/update-gasto-by-obra/:id/:gastoId" element={<UpdateGasto/>}/>
      </Routes>
    </Router>
  );
};

export default App;

