import React from 'react';
import NavBar from '../../../componentes/navbarAdmin/navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomeAdmin(){

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    return(
        <div className='flex flex-col h-full gap-10'>
            <NavBar/>
            <div className='flex flex-col items-center gap-10 h-full'>
                <h1>¡Bienvenido/a! {usuario.nombre}</h1>
                <div className='flex gap-10'>
                    <Button>
                        <Link className='text-white no-underline' to='/reclamos'>Reclamos</Link>
                    </Button>
                    <Button>
                        <a  className='text-white no-underline' href="/edificios">Edificios</a>
                        {/* <Link className='text-white no-underline' to='/edificios'>Edificios</Link> */}
                    </Button>
                    <Button>
                        <Link className='text-white no-underline' to='/usuarios'>Usuarios</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;