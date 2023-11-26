import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';




function ReclamoComponente(){

  const navigate = useNavigate();
  
  //Se requiere que el ingreso sea mínimo y cerrado. 
  const location = useLocation();

  const usuario = location.state && location.state.usuario;

  const [unidad, setUnidad] = useState({piso:'', numero:'', codigoEdificio:''})
  //ver lo de imagenes
  const [reclamo, setReclamo] = useState({documento:usuario.documento, codigoEdificio:'', ubicacion:'', descripcion:'', unidad:unidad, estado:'nuevo'});

  const manejarCambioEntradaUnidad = (e) => {
    const nuevoValor = e.target.value;
  
    // Convierte codigoEdificio a un número antes de actualizar el estado
    const valorReclamoUnidad = e.target.name === "codigoEdificio" ? parseInt(nuevoValor, 10) : nuevoValor;
    console.log(valorReclamoUnidad)
    setUnidad((prevUnidad) => ({ ...prevUnidad, [e.target.name]: valorReclamoUnidad }));
  
    // Actualiza el objeto reclamo con el estado más reciente de la unidad (teng que tener la unidad en reclamo y el codigoEdificio)
    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      unidad: { ...prevReclamo.unidad, [e.target.name]: valorReclamoUnidad },
      codigoEdificio: valorReclamoUnidad // Asigna el valor también a codigoEdificio del reclamo
    })); 
  };

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
            <input className='input-lectura' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} onChange={manejarCambioEntradaReclamo} readOnly/>
            <input className='globo' type='text' placeholder="Codigo del Edificio" name="codigoEdificio" id='codigoEdificio' value={unidad.codigoEdificio} onChange={manejarCambioEntradaUnidad} required/>
            <input className='globo' type='text' placeholder='Ubicacion' name='ubicacion' id='ubicacion' value={reclamo.ubicacion} onChange={manejarCambioEntradaReclamo}  required/>

            
            <input className='globo' type='text' placeholder='Piso' name='piso' id='piso' value={unidad.piso} onChange={manejarCambioEntradaUnidad} required/>
            <input className='globo' type='text' placeholder='Número' name='numero' id='numero' value={unidad.numero} onChange={manejarCambioEntradaUnidad} required/>

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
  

};

export default ReclamoComponente;