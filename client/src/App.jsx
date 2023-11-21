import './App.css'
import { useState, useEffect } from 'react';
//! Paginas
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import RegisterView from "./pages/RegisterView";
import { LoginView } from "./pages/LoginView";
import  ObraForm  from "./pages/ObraForm";
import Plantillas from './pages/Plantillas';
//! componentes
import ObraList from './components/ObraList';
import Navbar from './components/Navbar';




function App() {

  return (
    <>
    {/* Esto es para navegar entre lasdpaginas   */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to ="/login"/>} />
        <Route path="/register" element={<RegisterView/>} />
        <Route path="/login" element={<LoginView/>} />
        <Route path="/obras" element={<ObraList/>} />
        <Route path="/create-obra" element={<ObraForm/>} />
        <Route path="/plantilla" element={<Plantillas/>} />
        <Route path="/Navbar" element={<Navbar/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App