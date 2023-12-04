import React from 'react';
import NavBar from '../../../componentes/navbar/navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomeComponente(){

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    return(
        <div className='flex flex-col h-full gap-10'>
            <NavBar/>
            <div className='flex flex-col items-center gap-10 h-full'>
                <h1>¡Bienvenido/a! {usuario.nombre}</h1>
                <p className='max-w-[1200px]'>
                    En nuestro portal, ofrecemos una plataforma fácil y segura para presentar reclamos relacionados 
                    con edificios. Ya sea problemas con la administración, servicios o mantenimiento, estamos aquí para
                    escucharte. Simplificamos el proceso de comunicación entre residentes y administradores, asegurando 
                    un ambiente habitable y armonioso para todos. ¡Tu voz es importante para mantener nuestros hogares en
                    perfecto estado!
                </p>
                <div className="w-[1200px] flex justify-around">
                    <div className="flex flex-col gap-4">
                        <p className="text-center max-w-[220px]">Reportar desperfecto en una unidad en particular</p>
                        <Button variant='primary'><Link className='no-underline bg-transparent text-white' to='/reclamo-unidad'>Reclamar</Link></Button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="text-center max-w-[220px]">Reportar desperfecto en una parte comunitaria</div>
                        <Button variant='primary'><Link className='no-underline bg-transparent text-white' to='/reclamo-comun'>Reclamar</Link></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponente;