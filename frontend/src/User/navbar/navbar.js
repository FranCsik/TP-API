import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBarComponente(){

    //TODO: Sacar estilo al boton

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
    }

    return(
        <div className='NavBar'>
            <header>
                <nav>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href='/reclamo-unidad' >Reclamar Unidad</a></li>
                        <li><a  href='/reclamo-comun'>Reclamar Sector Comun</a></li>
                        <li><a  href='/mis-edificios'>Mis Edificios</a></li>
                        <li><a href='/mis-reclamos' >Mis Reclamos</a></li>
                        <li><a  href='/mi-perfil'>Perfil</a></li>
                        <li><button onClick={() => {cerrarSesion()}}><a href='/'>Cerrar Sesion</a></button></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarComponente;