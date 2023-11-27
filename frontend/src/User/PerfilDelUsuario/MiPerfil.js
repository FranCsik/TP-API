import React, { useState, useEffect } from 'react';
import './/MiPerfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponente from '../navbar/navbar';

function PerfilComponente(){

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const [loading, setLoading] = useState(true);

    const [persona, setPersona] = useState({nombre:'', documento:'', mail:'', password:''});

    useEffect( () => {
        const fetchUsuario = async () => {
            try {
                const respuesta = await fetch(`http://localhost/personas/${usuario.documento}`);
                const datos = await respuesta.json();
                setPersona(datos);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener usuario', error);
            }
        }
        fetchUsuario()
    }, [loading])

    return(
        <div className='Home'>
            <NavBarComponente/>
            <div>            
                <div className='datos-usuario'>
                    <h5>Nombre:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.nombre}</p>
                    <h5>Numero de Documento:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.documento}</p>
                    <h5>Mail:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.mail}</p>
                </div>
            </div>
        </div>
    );
}

export default PerfilComponente;