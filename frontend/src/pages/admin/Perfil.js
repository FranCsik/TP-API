import React, { useState, useEffect } from 'react';
import NavBar from '../../componentes/navbarAdmin/navbar';
import { Form } from 'react-bootstrap';

function Perfil(){

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
        <div className='flex flex-col h-full'>
            <NavBar/>
            <div className='flex flex-col justify-center items-center h-full'>     
            <h1>Mi Perfil</h1>
            <Form className='bg-slate-200 flex flex-col gap-4 min-w-[500px] p-20 shadow-2xl rounded-2xl'>
                <Form.Group controlId='Nombre'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type='text' value={persona.nombre} readOnly={true} />
                </Form.Group>
                <Form.Group controlId='Documento'>
                    <Form.Label>Documento</Form.Label>
                    <Form.Control type='text' value={persona.documento} readOnly={true} />
                </Form.Group>
                <Form.Group controlId='Mail'>
                    <Form.Label>Mail</Form.Label>
                    <Form.Control type='text' value={persona.mail} readOnly={true} />
                </Form.Group>
            </Form>
            </div>
        </div>
    );
}

export default Perfil;