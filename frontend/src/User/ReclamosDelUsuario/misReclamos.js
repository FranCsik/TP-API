import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './misReclamos.css';
import imagenOOPS from '../../recursos/oops.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';


function MisReclamosComponente(){

    

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    //const usuario = useState({documento:persona.documento});
    const [reclamos, setReclamos] = useState([]);
    const [loading, setLoading] = useState(true);



//Quiero obtener todos los reclamos del edificio al que es duenio o habita
const obtenerReclamosPorPersona = async () => {
    try {
        const respuesta = await fetch(`http://localhost/reclamos/persona/${usuario.documento}`);
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
        <div className='PantallaMiEdificio'>
            <NavBarComponente/>
            <div className='cuerpo'>
                <h2 className='tituloReclamos'>Mis Reclamos</h2>
                {loading === true && <div className='spinner'></div>}
                {loading === false && <div className='tabla-reclamos'>
                    {reclamos.length > 0 && (
                        <table border="1">
                            <thead>
                            <tr>
                                <th>N° Reclamo</th>
                                <th>Edificio</th>
                                <th>Nombre de Persona</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Sitio comun</th>
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
                                    <td>{reclamo.unidad && ("No")}{!reclamo.unidad &&("Si")}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                     )}
                     {reclamos.length === 0 && (
                        <h3>No hay reclamos</h3>
                     )}
                </div>}
            </div>
        </div>
    );
}

export default MisReclamosComponente;