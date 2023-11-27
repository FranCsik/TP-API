import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';




function ReclamoComponente(){
  //Se requiere que el ingreso sea mínimo y cerrado. 

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  
  //TODO: Ver como hacer lo de las imagenes

  const [unidad, setUnidad] = useState({piso:'', numero:'', codigoEdificio:''})
  //ver lo de imagenes
  const [reclamo, setReclamo] = useState({documento:usuario.documento, codigoEdificio:'', ubicacion:'', descripcion:'', unidad:null, estado:'nuevo'});

  const manejarCambioCodigoEdificio = (e) => {
    const nuevoValor = e.target.value

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      codigoEdificio: nuevoValor
    }))

    setUnidad((prevUnidad) => ({
      ...prevUnidad,
      codigoEdificio: nuevoValor
    }))

  }

  const manejadorCambioUbicacion = (e) => {
    const nuevoValor = e.target.value

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      ubicacion: nuevoValor
    }))
  }

  const manejadorCambioPiso = (e) => {
    const nuevoValor = e.target.value

    setUnidad((prevUnidad) => ({
      ...prevUnidad,
      piso: nuevoValor
    }))
  }

  const manejadorCambioNumero = (e) => {
    const nuevoValor = e.target.value

    setUnidad((prevUnidad) => ({
      ...prevUnidad,
      numero: nuevoValor
    }))
  }

  const manejadorCambioDescripcion = (e) => {
    const nuevoValor = e.target.value

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      descripcion: nuevoValor
    }))
  }

  //agregar el reclamo
  const agregarReclamo = async (reclamo,unidad) => {
    reclamo = {...reclamo, unidad: unidad}
    console.log(reclamo)
    try {
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
            alert('No se pudo agregar el reclamo, puede que no tenga los permisos necesarios.');
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
    <div className='PantallaReclamo'>
      <NavBarComponente/>

      <div className='cuerpo'>

        <p>Sólo puede hacer el reclamo si es propietario del edificio o inquilino de la unidad.</p>

        <h1 className='bienvenido'>¡Haz tu reclamo!</h1>
        <div className='contenedor-datos'>

        <form onSubmit={enviarFormulario}>
            <input className='input-lectura' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} readOnly/>
            <input className='globo' type='text' placeholder="Codigo del Edificio" name="codigoEdificio" id='codigoEdificio' value={reclamo.codigoEdificio} onChange={manejarCambioCodigoEdificio} required/>
            <input className='globo' type='text' placeholder='Ubicacion' name='ubicacion' id='ubicacion' value={reclamo.ubicacion} onChange={manejadorCambioUbicacion}  required/>

            
            <input className='globo' type='text' placeholder='Piso' name='piso' id='piso' value={unidad.piso} onChange={manejadorCambioPiso} required/>
            <input className='globo' type='text' placeholder='Número' name='numero' id='numero' value={unidad.numero} onChange={manejadorCambioNumero} required/>

            <textarea className='globo' type='text' placeholder='Descripción' name='descripcion' id='descripcion' value={reclamo.descripcion} maxLength='1000' onChange={manejadorCambioDescripcion}  required></textarea>
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


            <button className='globo-boton' type='submit' onClick={ () => { agregarReclamo(reclamo, unidad) }}> Enviar Reclamo </button>
        
          </form>


        </div>
        
    </div>
  </div>


  )
  

};

export default ReclamoComponente;