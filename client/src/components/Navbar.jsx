import React, { useState } from 'react';

const Navbar = () => {
  const [perfilOpcionesVisible, setPerfilOpcionesVisible] = useState(false);
  const [notificacionesOpcionesVisible, setNotificacionesOpcionesVisible] = useState(false);

  const togglePerfilOpciones = () => {
    setPerfilOpcionesVisible(!perfilOpcionesVisible);
  };

  const toggleNotificacionesOpciones = () => {
    setNotificacionesOpcionesVisible(!notificacionesOpcionesVisible);
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex items-center justify-between">
        {/* Sección "Perfil" */}
        <div>
          <span className="font-bold cursor-pointer" onClick={togglePerfilOpciones}>
            Perfil
          </span>
          {perfilOpcionesVisible && (
            <ul className="list-none ml-0">
              <li className="cursor-pointer hover:underline">Ver Perfil</li>
              <li className="cursor-pointer hover:underline">Cerrar Sesión</li>
            </ul>
          )}
        </div>

        {/* Sección "Notificaciones" */}
        <div>
          <span className="mx-2 font-bold cursor-pointer" onClick={toggleNotificacionesOpciones}>
            Notificaciones
          </span>
          {notificacionesOpcionesVisible && (
            <ul className="list-none ml-0">
              <li className="cursor-pointer hover:underline">Tareas Importantes</li>
              {/* Puedes agregar más opciones de notificaciones según tus necesidades */}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;