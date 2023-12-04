import React, { useState, useEffect } from 'react';
import NavBar from '../../../componentes/navbar/navbar';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


function MisEdificiosComponente(){

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const [loading, setLoading] = useState(true);
    const [edificios, setEdificios] = useState([]);
    
    useEffect( () => {
        const ObtenerEdificios = async () => {
            let resposeEdificios = await fetch(`http://localhost/personas/${usuario.documento}/edificios`);
            let dataEdificios = await resposeEdificios.json();
            setEdificios(dataEdificios);
            setLoading(false);
        }
        ObtenerEdificios();
    }, [loading])

    return(
        <div className='flex flex-col h-full gap-10'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto">
                <h1>Mis Edificios</h1>
                    {loading && (
                        <div className="flex flex-col justify-center items-center gap-2 h-full">
                            <Spinner animation="border" role="status"></Spinner>
                            <span>Cargando edificios... </span>
                        </div>
                    
                    )}
                    {!loading && (
                        <div className='tabla-edificios'>
                        {edificios.length > 0 && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Direccion</th>
                                        <th>Reclamos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {edificios.map(edificio => (
                                        <tr key={edificio.codigo}>
                                            <td className='p-2'>{edificio.codigo}</td>
                                            <td className='p-2'>{edificio.nombre}</td>
                                            <td className='p-2'>{edificio.direccion}</td>
                                            <td className='p-2'>
                                                <a href={`/mis-edificios/${edificio.codigo}/reclamos`} className='btn btn btn-primary ms-1'>Ver</a>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        {edificios.length === 0 && (
                            <div className='flex flex-col h-full justify-center items-center'>
                                <h3>No hay edificios</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div> 
    );
}

export default MisEdificiosComponente;