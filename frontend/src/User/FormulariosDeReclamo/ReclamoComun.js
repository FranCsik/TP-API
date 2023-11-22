import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reclamo.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';


function ReclamoComunComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;
    //const [usuario, setUsuario] = useState({documento:persona.documento});
    const [edificio, setEdificio] = useState({codigo:'0'});
    //const [unidad, setUnidad] = useState({piso:'', numero:''}); 
    //ver lo de imagenes
    const [reclamo, setReclamo] = useState({documento:usuario.documento, codigoEdificio:'', ubicacion:'', descripcion:'', estado:'nuevo'});


    //Manejadores de entrada
    
    const manejarCambioEntradaReclamo = (e) => {
        setReclamo({ ...reclamo, [e.target.name]: e.target.value });
    };

    
  //agregar el reclamo
  const agregarReclamo = async (reclamo) => {
    console.log(reclamo)
    try {
        console.log("ENTRO")
        const respuesta = await fetch('http://localhost/reclamos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify((
            reclamo
          )),

        });
        if (respuesta.ok) {
            alert('Reclamo agregado con exito');
        } else {
            alert('No se pudo agregar e reclamo.');
        }
        } catch (error) {
          alert('Error de red');
        }
};



    function enviarFormulario(e) {
        // Evitar la recarga de la página
        e.preventDefault();
      
        // Lógica para procesar el formulario
        console.log("Formulario enviado, pero la página no se recargará");
    }


    //SOBRE IMAGENES
    const [imagenes, setImagenes] = useState([]);

    const mostrarImagenes = (event) => {
    const nuevosArchivos = Array.from(event.target.files);

    setImagenes([...imagenes, ...nuevosArchivos]);
    };

    const eliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
    };
  

    return(
        <div className='PantallaReclamoComun'>
        <NavBarComponente/>

      <div className='cuerpo'>

        <p>Cualquiera puede hacer un reclamo sobre una parte comun del edificio dentro de los habilitados.</p>

        <h1 className='bienvenido'>¡Haz tu reclamo!</h1>
        <div className='contenedor-datos'>

        <form onSubmit={enviarFormulario}>
            <input className='input-lectura' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} readOnly/>
            <input className='globo' type='text' placeholder="Codigo del Edificio" name="codigoEdificio" id='codigoEdificio' value={reclamo.codigoEdificio} onChange={manejarCambioEntradaReclamo} required/>
            <input className='globo' type='text' placeholder='Ubicacion' name='ubicacion' id='ubicacion' value={reclamo.ubicacion} onChange={manejarCambioEntradaReclamo}  required/>

            <textarea className='globo' type='text' placeholder='Descripción' name='descripcion' id='descripcion' value={reclamo.descripcion} maxLength='1000' onChange={manejarCambioEntradaReclamo}  required></textarea>
            <p className='contador-caracteres'>1000 caracteres</p>

            <input type="file" id="imagenes" name="imagenes" multiple onChange={mostrarImagenes}/>
            <div id="contenedor-imagenes">
            {imagenes.map((imagen, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={URL.createObjectURL(imagen)}
                  style={{ width: '100px', marginLeft:'50px', marginTop:'20px' }}
                  alt={`Imagen ${index}`}
                />
                <button style={{ width: '100px', marginLeft:'50px', marginTop:'20px' }} onClick={() => eliminarImagen(index)}>Eliminar</button>
              </div>
            ))}
          </div>


            <button className='globo-boton' type='submit' onClick={ () => { agregarReclamo(reclamo) }}> Enviar Reclamo </button>
        
          </form>


        </div>
        
    </div>
  </div>


    )
}

export default ReclamoComunComponente;