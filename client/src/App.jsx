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
//* Rutas de Proveedores
import ProveedorsView from './views/ProveedoresView';
import RegisterProv from './components/proveedor/RegisterProv';
import UpdateProv from './components/proveedor/UpdateProv';
import DetallesProv from './views/DetallesProv';
//* rutas de banca y materiales
import UpdateBanca from './components/banca/UpdateBanca';
import UpdateMaterial from './components/material/UpdateMaterial';
//* rutas de Abono
import UpdateAbono from './components/Abono/UpdateAbono';


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
        {/** Vista de control de Proveedores*/}
        <Route path="/control-proveedores" element={<ProveedorsView />}/>
        <Route path="/details-prov/:id" element={<DetallesProv />} />
        <Route path="/create-prov" element={<RegisterProv />} />
        <Route path="/update-prov/:id" element={<UpdateProv />} />
        {/** Vista de Material*/}
        <Route path="/update-material-by-obra/:id/:mId" element={<UpdateMaterial />}/>
        {/** Vista de Banca*/}
        <Route path="/update-banca-by-obra/:id/:abonoId" element={<UpdateBanca />}/>
        {/** Vista de Banca*/}
        <Route path="/update-abono-by-obra/:id/:abonoId" element={<UpdateAbono />}/>
      </Routes>
    </Router>
  );
};

export default App;

