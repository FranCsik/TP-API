import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function NavBarComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;

    //Si toca el boton para Reportar desperfecto en una unidad en particular
    function ReclamarUnidad(){
        navigate('/reclamo-unidad', { state: { usuario: usuario } });
    }

    //Si toca el boton para Reportar desperfecto en una parte comunitaria
    function ReclamarComun(){
        navigate('/reclamo-comun', { state: { usuario: usuario } });
    }

    function IrHome(){
        navigate('/home', { state: { usuario: usuario } });
    }

    function MisEdificios(){
        navigate('/mis-edificios', { state: { usuario: usuario } });
      }

    function MisReclamos(){
        navigate('/mis-reclamos', {state : {usuario: usuario}})
    }

    function Perfil(){
        navigate('/perfil', {state : {usuario: usuario}})
    }


    return(
        <div className='Home'>
            <header>
                <nav>
                    <ul>
                        <li><a href="/home" onClick={IrHome}>Home</a></li>
                        <li><a href='/reclamo-unidad' onClick={ReclamarUnidad}>Reclamar Unidad</a></li>
                        <li><a  href='/reclamo-comun' onClick={ReclamarComun}>Reclamar Sector Comun</a></li>
                        <li><a  href='/mis-edificios'onClick={MisEdificios}>Mis Edificios</a></li>
                        <li><a href='/mis-reclamos' onClick={MisReclamos}>Mis Reclamos</a></li>
                        <li><a  href='/perfil'onClick={Perfil}>Perfil</a></li>
                        <li><a  href='/login'>Cerrar Sesión</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarComponente;