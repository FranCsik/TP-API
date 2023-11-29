import React, { useEffect, useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponente from '../navbar/navbar';




function ReclamoComponente(){
  //Se requiere que el ingreso sea mínimo y cerrado. 

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  //SOBRE IMAGENES
  const [imagenes, setImagenes] = useState([]);
  
  //TODO: Ver como hacer lo de las imagenes

  const [unidad, setUnidad] = useState({piso:'', numero:'', codigoEdificio:''})
  const [loading, setLoading] = useState(true);
  const [edificios, setEdificios] = useState([]);
  const [unidades, setUnidades] = useState([]);
  //ver lo de imagenes
  const [reclamo, setReclamo] = useState({documento:usuario.documento, codigoEdificio:'', ubicacion:'', descripcion:'', unidad:null, estado:'nuevo'});

  useEffect(() => {
    const fetchEdificios = async () => {
        let resposeEdificios = await fetch(`http://localhost/personas/${usuario.documento}/edificios`);
        let dataEdificios = await resposeEdificios.json();
        setEdificios(dataEdificios);
        setLoading(false);
    }
    fetchEdificios()
  }, [loading])


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

  const generarOperacion = async (reclamo, unidad, imagenes) => {
    let reclamoBD = await agregarReclamo(reclamo, unidad)
    if (!reclamoBD){
      alert('Error al agregar el reclamo')
      return
    }
    let imagenesBD = await agregarImagenes(imagenes, reclamoBD)
    if (!imagenesBD){
      alert('Error al agregar las imagenes')
    }
  }

  const agregarImagenes = async (imagenes, reclamoBD) => {
    //Hacer endpoint para agregar imagenes
    let imagenesAEnviar = []
    for (let imagen of imagenes) {
      let imagenAEnviar = { direccion:URL.createObjectURL(imagen), tipo:imagen.type.split('/')[1]}
      imagenesAEnviar.push(imagenAEnviar)
    }

    let response = await fetch(`http://localhost/reclamos/${reclamoBD.numero}/agregarImagenes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imagenesAEnviar),
    })

    if (response.ok) {
      return true
    }
    return false

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
            return await respuesta.json();
        }
        return null;
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

  const mostrarImagenes = (event) => {
    // const nuevosArchivos = Array.from(event.target.files);
    // let nuevasImagenes = [];
    // for (let archivo of nuevosArchivos) {
    //   nuevasImagenes.push(URL.createObjectURL(archivo));
    // }
    const nuevosArchivos = Array.from(event.target.files);
    
    setImagenes([...imagenes, ...nuevosArchivos]);
    console.log(imagenes);
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
            <input style={{color:'transparent', maxWidth:"82px"}} type="file" id="imagenes" name="imagenes" accept='image/*' multiple onChange={mostrarImagenes}/>
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
            <button className='globo-boton' type='submit' onClick={ () => { generarOperacion(reclamo,unidad,imagenes) }}> Enviar Reclamo </button>
          </form>
        </div>
    </div>
  </div>


  )
  

};

export default ReclamoComponente;