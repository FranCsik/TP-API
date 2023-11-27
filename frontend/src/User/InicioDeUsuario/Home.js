import React, { useState, useEffect } from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

function HomeComponente(){

    // const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
     

    //Si toca el boton para Reportar desperfecto en una unidad en particular
    // function ReclamarUnidad(){
    //     navigate('/reclamo-unidad');
    // }

    // //Si toca el boton para Reportar desperfecto en una parte comunitaria
    // function ReclamarComun(){
    //     navigate('/reclamo-comun');
    // }

    return(
        <div className='Home'>
            <NavBarComponente/>
            <div>
                {console.log(usuario)}
                <h1 className='bienvenida'>¡Bienvenido/a! {usuario.nombre}</h1>

                <p className='parrafo-bienvenida'>
                    En nuestro portal, ofrecemos una plataforma fácil y segura para presentar reclamos relacionados 
                    con edificios. Ya sea problemas con la administración, servicios o mantenimiento, estamos aquí para
                    escucharte. Simplificamos el proceso de comunicación entre residentes y administradores, asegurando 
                    un ambiente habitable y armonioso para todos. ¡Tu voz es importante para mantener nuestros hogares en
                    perfecto estado!
                </p>


                <div className="container">
                    <div className="text-button-container">
                        <div className="text">Reportar desperfecto en una unidad en particular</div>
                        <a className='button' href='/reclamo-unidad'>Reclamar</a>
                    </div>

                    <div className="text-button-container">
                            <div className="text">Reportar desperfecto en una parte comunitaria</div>
                            <a className='button' href='/reclamo-comun'>Reclamar</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponente;