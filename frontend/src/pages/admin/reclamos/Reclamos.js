import React, {useEffect, useState} from 'react';
import NavBar from '../../../componentes/navbarAdmin/navbar';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as common from '../../../common';


function Reclamos(){

    const [reclamos, setReclamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState("ninguno");

    useEffect(() => {
        const fetchReclamos = async () => {
            let response = await fetch(`http://localhost/reclamos${estado == "ninguno" ? '' : `?estado=${estado}` }`);
            let data = await response.json();
            setReclamos(data);
            setLoading(false);
        }
        fetchReclamos();
    },[loading]);

    const eliminarReclamo = async (e, id) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/reclamos/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })
        if (response.status === 200){
            alert("Reclamo eliminado");
            setLoading(true);
        }
    }

    const manejarEstado = (e) => {
        setEstado(e.target.value);
        setLoading(true);
    }

    const estados = [
        "ninguno", "nuevo", "abierto", "enProceso", "desestimado", "anulado", "terminado"
    ]


    return(
        <div className='flex flex-col h-full'>
            <NavBar/>
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <Spinner animation="border" role="status"></Spinner>
                        <span>Cargando reclamos... </span>
                    </div>
                ):(
                    <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                        <h1>Reclamos</h1>

                        {reclamos.length > 0 ? (
                        <div>
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
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th scope="col">N° Reclamo</th>
                                        <th scope="col">Edificio</th>
                                        <th scope="col">Nombre de Persona</th>
                                        <th scope="col">Ubicacion</th>
                                        <th scope="col">Descripcion</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Sitio comun</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {reclamos.map((reclamo) => (
                                        <tr key={reclamo.numero}>
                                            <td>{reclamo.numero}</td>
                                            <td>{reclamo.edificio.nombre}</td>
                                            <td>{`${reclamo.usuario.nombre}`}</td>
                                            <td><p className='max-w-[200px] truncate'>{reclamo.ubicacion}</p></td>
                                            <td><p className='max-w-[200px] truncate'>{reclamo.descripcion}</p></td>
                                            <td>{reclamo.estado}</td>
                                            <td>{reclamo.unidad && ("No")}{!reclamo.unidad &&("Si")}</td>
                                            <td>
                                                <div className='flex gap-2'>
                                                    <Button variant="primary"><Link className='text-white no-underline' to={`/verReclamos/${reclamo.numero}`}>Ver</Link></Button>
                                                    <Button variant="success"><Link className='text-white no-underline' to={`/reclamos/${reclamo.numero}/actualizar`}>Actualizar</Link></Button>
                                                    <Button variant="danger" onClick={ (e) => {eliminarReclamo(e,reclamo.numero)}}>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        </div>
                            
                        ):(
                            <div>
                                <h3>No hay reclamos</h3>
                            </div>
                        )}
                        
                    </div>
                )}
        </div>
    )
};

export default Reclamos;