import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import RegisterUser from './views/RegisterUser';
import Dashboard from './views/Dashboard';
//* Rutas de obras
import ObraForm from './components/ObraForm';
import UpdateObraForm from './components/UpdateObraForm';
import DetallesObra from './views/DetallesObra';
//* Rutas de Tareas
import TareaView from './views/TareaView';
import UpdateTarea from './components/Tarea/UpdateTarea';
//* Rutas de Gasto
import ControlAdmin from './views/ControlAdmin';
import UpdateGasto from './components/Gasto/UpdateGasto';
//* Rutas de Volumen
import ControlObra from './views/ControlObra';
import UpdateVolumen from './components/Volumen/UpdateVolumen';
//* Rutas de Galeria
import ControlGaleria from './views/ControlGaleria';


const App = () => {

  return (
    <Router>
      <Routes>
        < Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-obra" element={<ObraForm />} />
        <Route path="/update-obra/:id" element={<UpdateObraForm />} />
          {/* Vista de Aciones para una OBRA */}
        <Route path="/details-obra/:id" element={<DetallesObra />} />
          {/* Vista control de TAREAS */}
        <Route path="/control-tarea/:id" element={<TareaView />} />
        <Route path={"/update-tarea-by-obra/:id/:tareaId"} element={<UpdateTarea />} />
        {/* Vista de control GASTOS */}
        <Route path="/control-gastos/:id" element={<ControlAdmin/>} />
        <Route path={"/update-gasto-by-obra/:id/:gastoId"} element={<UpdateGasto/>}/>
        {/* Vista de control de Volumenes */}
        <Route path="/control-obra/:id" element={<ControlObra/>}/>
        <Route path="/update-volumen-by-obra/:id/:volumenId" element={<UpdateVolumen />} />
        {/** Vista de control de galeria*/}
        <Route path="/control-galeria/:id" element={<ControlGaleria />}/>
      </Routes>
    </Router>
  );
};

export default App;

