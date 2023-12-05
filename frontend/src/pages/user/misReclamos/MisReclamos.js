import React, { useState, useEffect } from 'react';
import NavBar from '../../../componentes/navbar/navbar';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


function MisReclamosComponente(){

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const [reclamos, setReclamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState("ninguno");

    const manejarEstado = (e) => {
        setEstado(e.target.value);
        setLoading(true);
    }

    const estados = [
        "ninguno", "nuevo", "abierto", "enProceso", "desestimado", "anulado", "terminado"
    ]

const obtenerReclamosPorPersona = async () => {
    try {
        const respuesta = await fetch(`http://localhost/reclamos/persona/${usuario.documento}${estado == "ninguno" ? '' : `?estado=${estado}` }`);
        const datos = await respuesta.json();
        setReclamos(datos);
        setLoading(false)
    } catch (error) {
        console.error('Error al obtener reclamos', error);
    }
}

useEffect( () => {
    obtenerReclamosPorPersona()
}, [loading])
    
    return(
        <div className='flex flex-col h-full'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                <h1>Mis Reclamos</h1>
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <Spinner animation="border" role="status"></Spinner>
                        <span>Cargando reclamos... </span>
                    </div>
                ):(
                    <div className='flex flex-col gap-4'>
                        <Form>
                            <Form.Group controlId='estado'>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select onChange={manejarEstado}>
                                    <option value={estado}>{estado}</option>
                                    {estados.map((estadoMap) => {
                                        return estadoMap != estado && (<option value={estadoMap}>{estadoMap}</option>)
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                        {reclamos.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>N° Reclamo</th>
                                        <th>Edificio</th>
                                        <th>Nombre de Persona</th>
                                        <th>Ubicacion</th>
                                        <th>Descripción</th>
                                        <th>Estado</th>
                                        <th>Sitio comun</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reclamos.map(reclamo => (
                                        <tr key={reclamo.id_reclamo}>
                                            <td>{reclamo.numero}</td>
                                            <td>{reclamo.edificio.nombre}</td>
                                            <td>{`${reclamo.usuario.nombre}`}</td>
                                            <td><p className='max-w-[200px] truncate'>{reclamo.ubicacion}</p></td>
                                            <td><p className='max-w-[200px] truncate'>{reclamo.descripcion}</p></td>
                                            <td>{reclamo.estado}</td>
                                            <td>{reclamo.unidad && ("No")}{!reclamo.unidad &&("Si")}</td>
                                            <td><Button variant="primary"><Link className='text-white no-underline' to={`/reclamos/${reclamo.numero}`}>Ver</Link></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ):(
                            <h3>No hay reclamos</h3>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MisReclamosComponente;