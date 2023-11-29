import React from 'react'
import { Link } from "react-router-dom";


const NotFound = ( ) =>{
    return(
        <div>
            <h2>Pagina no encontrada</h2>
            <p>Lo sentimos, la pagina que estas buscando no existe.</p>
            <p>Regresa a la <Link to="">pagina principal</Link></p>
        </div>
    );
}

export default NotFound;