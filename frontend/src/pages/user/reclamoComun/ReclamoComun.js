import React, { useEffect, useState } from 'react';
import NavBar from '../../../componentes/navbar/navbar';
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import * as common from "../../../common"

function ReclamoComun(){
  //Se requiere que el ingreso sea mínimo y cerrado. 

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
    const [reclamo, setReclamo] = useState({documento:usuario.documento, codigoEdificio:'', ubicacion:'', descripcion:'', estado:'nuevo'});
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    const fetchEdificios = async () => {
        let resposeEdificios = await fetch(`http://localhost/personas/${usuario.documento}/edificios`);
        let dataEdificios = await resposeEdificios.json();
        setEdificios(dataEdificios);
        setImagenes([])
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
  }

  const manejadorCambioUbicacion = (e) => {
    const nuevoValor = e.target.value

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      ubicacion: nuevoValor
    }))
  }

  const manejadorCambioDescripcion = (e) => {
    const nuevoValor = e.target.value

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      descripcion: nuevoValor
    }))
  }

  const generarOperacion = async (reclamo, imagenes) => {
    if (!validarInputs()){
      alert('Debes completar todos los campos')
      return
    }
    let reclamoBD = await agregarReclamo(reclamo)
    if (!reclamoBD){
      alert('Error al agregar el reclamo')
      return
    }
    
    let imagenesBD = await agregarImagenes(imagenes, reclamoBD)
    if (!imagenesBD){
      alert('Error al agregar las imagenes')
      return
    }
    alert('Reclamo agregado con exito')
    setLoading(true)
  }

  const agregarImagenes = async (imagenes, reclamoBD) => {
    
    for (let imagen of imagenes) {
      let imagenAEnviar = { direccion: await common.convertToBase64(imagen), tipo:imagen.type.split('/')[1]}
      let response = await fetch(`http://localhost/reclamos/${reclamoBD.numero}/agregarImagen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imagenAEnviar),
      })
      return response.ok ? true : false
    }
  }

  const agregarReclamo = async (reclamo) => {
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
        return respuesta.ok ? await respuesta.json() : null;
    } catch (error) {
        alert('Error de red');
    }
};

  const mostrarImagenes = (event) => {
    const nuevosArchivos = Array.from(event.target.files);
    setImagenes([...imagenes, ...nuevosArchivos]);
  };

  const eliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  const validarInputs = () => {
    if (reclamo.codigoEdificio === "" || reclamo.ubicacion === "" || reclamo.descripcion === ""){
      return false
    }
    return true
  }


  return(
    <div className='flex flex-col h-full'>
      <NavBar/>
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-2 h-full">
          <Spinner animation="border" role="status"></Spinner>
          <span>Cargando informacion... </span>
        </div>
      ):(
        <div className='flex flex-col gap-10 items-center p-6 overflow-auto'>
          <div className='flex flex-col gap-4'>
            <p className='text-center'>Cualquiera puede hacer un reclamo sobre una parte comun del edificio dentro de los habilitados.</p>
            <h1 className='text-center'>¡Haz tu reclamo!</h1>
          </div>
          <Form controlId="Reclamo" className='flex flex-col p-4 bg-slate-100 gap-3 rounded-2xl shadow-2xl'>
            <Form.Group controlId="Documento">
              <Form.Label>Documento</Form.Label>
              <Form.Control type="text" placeholder="Documento" name="documento" value={usuario.documento} readOnly/>
            </Form.Group>
            <Form.Group controlId="Edificio">
              <Form.Label>Edificio</Form.Label>
              <Form.Select name="Edificio" onChange={manejarCambioCodigoEdificio} required>
                <option value="Default">Elige un edificio</option>
                {edificios.map((edificio)=> {
                  return (
                    <option value={edificio.codigo}>{edificio.nombre}</option>
                    )
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="Ubicacion">
              <Form.Label>Ubicacion</Form.Label>
              <Form.Control type="text" placeholder="Ubicacion" name="ubicacion" onChange={manejadorCambioUbicacion} required/>
            </Form.Group>
            <Form.Group controlId="Descripcion">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" placeholder="Descripcion" name="descripcion" onChange={manejadorCambioDescripcion} required/>
            </Form.Group>
            <Form.Group controlId="Imagenes">
              <Form.Label>Imagenes</Form.Label>
              <Form.Control type="file" name="imagenes" accept='image/*' multiple onChange={mostrarImagenes} required/>
            </Form.Group>
            <div className='flex flex-col gap-2'>
              {imagenes.map((imagen, index) => (
                <div className='flex justify-around items-center' key={index} >
                  <img className='w-[100px]'
                    src={URL.createObjectURL(imagen)}
                    alt={`Imagen ${index}`}
                  />
                  <Button variant='danger' className='h-fit' onClick={() => eliminarImagen(index)}>Eliminar</Button>
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={ () => { generarOperacion(reclamo,imagenes) }}>Reclamar</Button>
          </Form>
    </div>
      )}
  </div>
  )
};

export default ReclamoComun;