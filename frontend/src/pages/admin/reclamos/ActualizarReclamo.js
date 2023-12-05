import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import * as common from '../../../common';
import NavBar from '../../../componentes/navbarAdmin/navbar';
import Form from 'react-bootstrap/Form';
import { Spinner, Button } from 'react-bootstrap';

function ActualizarReclamo() {
    
        const params = useParams();
        const [loading, setLoading] = useState(true);
        const [reclamo, setReclamo] = useState([]);
        const [imagenes, setImagenes] = useState([]);
        const [form, setForm] = useState({detalles:"", estado:"", imagenes:[]});
        const estadosReclamo = common.estado
    
        useEffect(() => {
            const fetchReclamos = async () => {
                const res = await fetch(`http://localhost/reclamos/${params.idReclamo}`);
                const data = await res.json();
                setReclamo(data);
                setImagenes(data.imagenes);
                setLoading(false);
                setForm({
                    detalles: "",
                    estado: data.estado,
                    imagenes: []
                })
            }
            fetchReclamos();
        },[loading]);

        const manejoDatos = (e) => {
            const { name , value } = e.target;
            setForm(
                {
                    ...form, 
                    [name]: value,
                }
            );
        };

        const actualizarReclamo = async (e) => {
            e.preventDefault();
            const nuevoForm = {
                descripcion: form.detalles ? form.detalles : "",
                estado: form.estado,
            }
            const res = await fetch(`http://localhost/reclamos/${params.idReclamo}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(nuevoForm)
            });
            if (res.status > 300){
                alert("Error al actualizar reclamo");
                return
            }
            if (res.status === 200){
                return await res.json();
            }
        }

        const generarOperacion = async (e) => {

            let reclamoBD = await actualizarReclamo(e)
            if (!reclamoBD){
              alert('Error al agregar el reclamo')
              return
            }
            
            let imagenesBD = await agregarImagenes(reclamoBD)
            if (!imagenesBD){
              alert('Error al agregar las imagenes')
              return
            }
            alert('Reclamo actualizado con exito')
            setLoading(true)
        }

        const agregarImagenes = async (reclamoBD) => {
                
            for (let imagen of form.imagenes) {
                let imagenAEnviar = { direccion: await common.convertToBase64(imagen), tipo:imagen.type.split('/')[1]}
                let response = await fetch(`http://localhost/reclamos/${reclamoBD.numero}/agregarImagen`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(imagenAEnviar),
                })
                if (response.status > 300){
                    return false
                }
            }
            return true
        }

        const eliminarReclamo = async (e) => {
            e.preventDefault();
            let response = await fetch(`http://localhost/reclamos/${params.idReclamo}`, {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
            })
            if (response.status === 200){
                alert("Reclamo eliminado");
                setLoading(true);
            }
        }

        const mostrarImagenes = (event) => {
            const nuevosArchivos = Array.from(event.target.files);
            setForm({
                ...form,
                imagenes: [...form.imagenes, ...nuevosArchivos]
            })
          };
        
          const eliminarImagen = (index) => {
            const nuevasImagenes = [...imagenes];
            nuevasImagenes.splice(index, 1);
            setForm({
                ...form,
                imagenes: nuevasImagenes
            })
          };

        return(
            <div className='flex flex-col h-full'>
                <NavBar/>
                <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center gap-2 h-full">
                            <Spinner animation="border" role="status"></Spinner>
                            <span>Cargando reclamo... </span>
                        </div>
                    ):(
                        <div className="flex flex-col gap-4">
                            <h1 className='text-center'>Reclamo</h1>
                            <Form className=' bg-slate-200 flex flex-col gap-4 min-w-[500px] p-12 shadow-2xl rounded-2xl'>
                                <Form.Group controlId="Numero">
                                    <Form.Label>Numero</Form.Label>
                                    <Form.Control name="Numero" type="text" value={reclamo.numero} />
                                </Form.Group>
                                <Form.Group controlId="Edificio">
                                    <Form.Label>Edificio</Form.Label>
                                    <Form.Control name="edificio" type="text" value={reclamo.edificio.nombre} />
                                </Form.Group>
                                <Form.Group controlId="Ubicacion">
                                    <Form.Label>Ubicacion</Form.Label>
                                    <Form.Control name="ubicacion" type="text" value={reclamo.ubicacion} />
                                </Form.Group>
                                {reclamo.unidad && (
                                    <Form.Group controlId="Unidad">
                                        <Form.Label>Unidad</Form.Label>
                                        <div class="flex justify-around gap-4">
                                            <Form.Group controlId="Piso">
                                                <Form.Label>Piso</Form.Label>
                                                <Form.Control name="Piso" type="text" value={reclamo.unidad.piso} />
                                            </Form.Group>
                                            <Form.Group controlId="Numero">
                                                <Form.Label>Numero</Form.Label>
                                                <Form.Control name="Numero" type="text" value={reclamo.unidad.numero} />
                                            </Form.Group>
                                        </div>
                                    </Form.Group>
                                )}
                                <Form.Group controlId='Descripcion'>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control name="Descripcion" as="textarea" value={reclamo.descripcion}  />
                                </Form.Group>
                                <Form.Group controlId='Imagenes'>
                                    <Form.Label>Imagenes</Form.Label>
                                    {imagenes.length > 0 ? (
                                        <div className='flex  gap-8'>
                                            {reclamo.imagenes.map((imagen) => (
                                                <div className='flex gap-3 items-center' >
                                                    <img className='w-[100px]'
                                                        src={imagen.direccion}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ):(
                                        <div className='flex w-full justify-center'>
                                            <h4>No hay imagenes</h4>
                                        </div>
                                    )}
                                </Form.Group>
                                <p className='max-w-[500px]'>Puedes actualizar el reclamo agregando detalles y cambiando el estado. Los detalles se agregaran al final de la descripcion.</p>
                                <Form.Group controlId='Estado'>
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select name="estado" onChange={manejoDatos}>
                                        <option selected value={reclamo.estado}>{reclamo.estado}</option>
                                        {estadosReclamo.map((estado) => {
                                            return reclamo.estado != estado && (<option value={estado}>{estado}</option>)
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='Detalles'>
                                    <Form.Label>Agregar detalles</Form.Label>
                                    <Form.Control name="detalles" as="textarea" placeholder="Agregar detalles" onChange={manejoDatos}/>
                                </Form.Group>
                                <Form.Group className='flex-col flex gap-4' controlId='AgregarImagenes'>
                                    <div className='flex flex-col'>
                                        <Form.Label>Agregar imagenes</Form.Label>
                                        <Form.Control name="imagenes" type="file" accept='image/*' multiple onChange={mostrarImagenes} />
                                    </div>
                                    <div className='flex gap-4 flex-col items-center'>
                                        {form.imagenes.map((imagen, index) => (
                                            <div className='flex gap-4 items-center' >
                                                <img className='w-[100px]'
                                                    src={URL.createObjectURL(imagen)}
                                                />
                                                <Button variant="danger" onClick={() => eliminarImagen(index)}>Eliminar</Button>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>
                                <div className="flex gap-4 w-full justify-end">
                                    <Button variant="danger" onClick={(e) => {eliminarReclamo(e)}}><Link className="text-white no-underline" to="/reclamos">Eliminar</Link></Button>
                                    <Button onClick={(e) => {generarOperacion(e)}}>Aceptar</Button>
                                </div>
                            </Form>
                        </div>
                    )}
            </div>
        </div>
            
        )
}


export default ActualizarReclamo;

{/* <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-7">
                    <div className="card rounded-3">
                    <div className="card-body p-">
                        <h1 className="text-center my-3 pb-3">Reclamo: {reclamo.numero}</h1>

                        <p>Creador: { !loading ? `${reclamo.usuario.nombre} | ${reclamo.usuario.documento}`:  ""} </p>
                        <p>Edificio: { !loading ? `${reclamo.edificio.nombre} | ${reclamo.edificio.direccion}`:  ""} </p>
                        <p>Unidad: { !loading ? `piso ${reclamo.unidad.piso}, unidad ${reclamo.unidad.numero}`:  ""} </p>
                        <p>Ubicación: { !loading ? `${reclamo.ubicacion}`:  ""} </p>
                        <p>Descripcion: { !loading ? `${reclamo.descripcion}`:  ""} </p>

                        <label>Agregar detalles</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion" placeholder="Agregar detalles" aria-describedby="basic-addon2" value={form.descripcion} onChange={manejoDatos}/>
                        <label>Estado</label>
                        <select class="form-control" value={form.estado} name="estado" onChange={manejoDatos}>
                        {estadosReclamo.map((estado) => (
                            <option value={estado} defaultValue={ estado==form.estado?true:false}>{estado}</option>
                        ))}

                        </select>
                        <button type="submit" className="btn btn-success ms-1" onClick={actualizarReclamo}>Actualizar</button>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section> */}