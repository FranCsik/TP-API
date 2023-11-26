import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MisEdificios.css';
import imagenOOPS from '../../recursos/oops.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';


function MisEdificiosComponente(){

    const navigate = useNavigate();
    const location = useLocation();
    const usuario = location.state && location.state.usuario;

    const [loading, setLoading] = useState(true);

    const [edificios, setEdificios] = useState([]);

    function navegarReclamos(edificio){
        navigate(`/mis-edificios/${edificio.codigo}/reclamos`, { state: { usuario: usuario, edificio: edificio} });
    }
    
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
        <div className='PantallaMiEdificio'>
            <NavBarComponente/>

            <div className="cuerpo">

                <h2 className='tituloEdificios'>Mis Edificios</h2>
                
                    {loading === true && (
                        <div className="loader">
                            <div className="spinner"></div>
                            <p>Buscando edificios...</p>
                        </div>
                    
                    )}

                    {loading === false && (
                        <div className='tabla-edificios'>
                        {edificios.length > 0 && (
                            <table border="1">
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
                                                <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => {navegarReclamos(edificio)} }>Ver</button>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {edificios.length === 0 && (
                            <h3>No hay edificios</h3>
                        )}
                    </div>
                )}
            </div>
        </div> 
    );
}

export default MisEdificiosComponente;