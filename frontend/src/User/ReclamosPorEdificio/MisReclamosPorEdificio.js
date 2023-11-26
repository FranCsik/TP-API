import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function MisEdificiosComponente(){

    const location = useLocation();
    const usuario = location.state && location.state.usuario;
    const edificio = location.state && location.state.edificio;

    const [reclamos, setReclamos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchReclamos = async () => {
            let response = await fetch(`http://localhost/edificios/${edificio.codigo}/reclamos/${usuario.documento}`);
            let data = await response.json();
            setReclamos(data);
            setLoading(false);
        }
        fetchReclamos();
    }, [loading])


    return(
        <div>
            <div>
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
            </div>
        </div>
        
    );

}

export default MisEdificiosComponente;