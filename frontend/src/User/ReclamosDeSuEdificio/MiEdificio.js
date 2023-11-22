import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MiEdificio.css';
import imagenOOPS from '../../recursos/oops.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';


function MiEdificioComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;
    //const usuario = useState({documento:persona.documento});
    const [edificio, setEdificio] = useState({codigo:'', nombre:''});
    const [nombreEdificio, setNombreEdificio] = useState('');
    const [verificarHabilitacion, setVerificarHabilitacion] = useState('');

    const [reclamos, setReclamos] = useState([]);

    const manejarCambioEntradaEdificio = (e) => {
        const ed = { ...edificio, [e.target.name]: e.target.value };
        setEdificio(ed);
    };

    //quiero el nombre del edificio
    const ObtenerNombreEdificio = async () => {
        console.log("prueba",edificio.codigo)
        try {
          const respuesta = await fetch(`http://localhost/edificios/${edificio.codigo}`);
          const datos = await respuesta.json();
          console.log(datos)

          if (respuesta.ok){
            ObtenerReclamos()
          }
          else{
            alert('No se puedo obtener en edificio')
          }
          
          // Actualiza el estado con el nombre del edificio
          setNombreEdificio(datos.nombre); // Ajusta según la estructura de tu API
        } catch (error) {
          console.error('Error al obtener el edificio', error);
        }
      };

//Quiero obtener todos los reclamos del edificio al que es duenio o habita
const ObtenerReclamos = async () => {
    setVerificarHabilitacion(true)
    try {
        const respuesta = await fetch(`http://localhost/reclamos/edificio/${parseInt(edificio.codigo)}`);
        const datos = await respuesta.json();
        console.log(datos)
          setReclamos(datos);
        } catch (error) {
          console.error('Error al obtener reclamos', error);
        }
    }

const obtenerHabilitadosPorEdificio = async () => {
    setVerificarHabilitacion(null)
    try {
        const respuesta = await fetch(`http://localhost/edificios/${parseInt(edificio.codigo)}/habilitados`)
        
        if (respuesta.ok){
            const data = await respuesta.json()
            console.log(data)
            
            for(let habilitado of data){
                
                if(habilitado.documento === usuario.documento){
                    setVerificarHabilitacion(true)
                    ObtenerNombreEdificio()
                    console.log('Este usuario esta habilitado')
                    break;
                }
                else{
                    setVerificarHabilitacion(false)
                    console.log('Este usuario no esta hbailitado')  
                }
            }
        }
    }
    catch (error){
        console.error('Error al obtener habilitados', error);
        // console.log('Error al obtener respuesta')
    }
}
    
    
    return(
        <div className='PantallaMiEdificio'>
        <NavBarComponente/>

        <div className='cuerpo'>
            <div className='contenedor-edificio'>
                <p>Ingrese el codigo de su edificio del que desea ver los reclamos</p>
                <input className='casilla' type='text' placeholder="Codigo del Edificio" name="codigo" id='codigo' value={edificio.codigo} onChange={manejarCambioEntradaEdificio} required/>
                <button className='boton-verificar' type='submit' onClick={() => { obtenerHabilitadosPorEdificio()}}> ver </button>
            </div>
            
            

            <h2 className='tituloReclamos'>Reclamos</h2>

            
            {verificarHabilitacion === null && (
                <div className='loading'>
                    <div className="spinner"></div>
                    <p>Buscando reclamos de su edificio</p>
                </div>)}
            
            
            
            {verificarHabilitacion === true && (
                <div className='tabla-reclamos'>
                    <h1>{nombreEdificio}</h1><br></br>
                    {reclamos.length > 0 && (
                        <table border="1">
                            <thead>
                            <tr>
                                <th>Nombre de Persona</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reclamos.map(reclamo => (
                                <tr key={reclamo.id_reclamo}>
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
            
            )}

            {verificarHabilitacion === false && <div className="ups">
                <img src={imagenOOPS} alt="OOPS!" style={{width:"250px", height:"250px"}}/>
                <p>Ups, no es dueño ni inquilino de este edificio para visualizar sus reclamos.</p>
                </div>} 

            </div>
        </div>
    );
}

export default MiEdificioComponente;