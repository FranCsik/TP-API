import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../../../componentes/navbar/navbar';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


function MisEdificiosComponente(){

    const params = useParams();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const [edificio, setEdificio] = useState({});
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

    useEffect( () => {
        const fetchReclamos = async () => {
            let response = await fetch(`http://localhost/edificios/${params.codigoEdificio}/reclamos/${usuario.documento}${estado == "ninguno" ? '' : `?estado=${estado}` }`);
            let data = await response.json();
            setReclamos(data);
            
        }
        const fetchEdificio = async () => {
            let response = await fetch(`http://localhost/edificios/${params.codigoEdificio}`);
            let data = await response.json();
            setEdificio(data);
        }
        const fetchAll = async () => {
            await fetchReclamos();
            await fetchEdificio();
            setLoading(false);
        }
        fetchAll();
    }, [loading])


    return(
        <div className='flex flex-col gap-10 h-full'>
            <NavBar/>

            {loading ? (
                <div className="flex flex-col justify-center items-center gap-2 h-full">
                    <Spinner animation="border" role="status"></Spinner>
                    <span>Cargando edificios... </span>
                </div>

            ):(

                <div className="flex flex-col h-full items-center gap-6">
                    <h1>{edificio.nombre} - {edificio.direccion}</h1>
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
                                        <td><Button variant="primary"><Link className='text-white no-underline' to={`/reclamos/${reclamo.numero}`}>Ver</Link></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        ):(
                            <div className='flex flex-col justify-center items-center'>
                                <h3>No hay reclamos</h3>
                            </div>
                        )}
                        

                    </div>
                </div>
                
                
                
            )}







            
            {/* <div>
                <h1>{edificio.nombre} - {edificio.direccion}</h1>
            </div>
            <div>
                <h1>Reclamos</h1>

                <div className='tabla-reclamos'>
                    {reclamos.length > 0 && (
                        <table className="table mb-3">
                        <thead>
                            <tr>
                                <th>N° Reclamo</th>
                                <th>Edificio</th>
                                <th>Nombre de Persona</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                        {reclamos.map(reclamo => (
                                    <tr key={reclamo.id_reclamo}>
                                        <td>{reclamo.numero}</td>
                                        <td>{reclamo.edificio.nombre}</td>
                                        <td>{`${reclamo.usuario.nombre}`}</td>
                                        <td>{reclamo.descripcion}</td>
                                        <td>{reclamo.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     )}
                     {reclamos.length === 0 && (
                        <h3>No hay reclamos</h3>
                     )}
                </div>
            </div> */}
        </div>
        
    );

}

export default MisEdificiosComponente;