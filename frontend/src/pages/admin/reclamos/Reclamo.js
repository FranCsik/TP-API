import React, {useState, useEffect} from 'react';
import NavBar from '../../../componentes/navbarAdmin/navbar';
import { Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Reclamo(){

    const [loading, setLoading] = useState(true);
    const [reclamo, setReclamo] = useState({});
    const params = useParams();

    useEffect(() => {
        const ObtenerReclamo = async () => {
            let resposeReclamo = await fetch(`http://localhost/reclamos/${params.idReclamo}`);
            let dataReclamo = await resposeReclamo.json();
            setReclamo(dataReclamo);
            setLoading(false);
        }
        ObtenerReclamo();
        
    }, [loading])
    
    return(
        <div className='flex flex-col h-full gap-10'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center gap-2 h-full">
                            <Spinner animation="border" role="status"></Spinner>
                            <span>Cargando reclamo... </span>
                        </div>
                    ):(
                        <Form controlId="Reclamo" className='flex flex-col p-4 bg-slate-100 gap-3 rounded-2xl shadow-2xl w-2/4'>
                            <Form.Group controlId="Documento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type="text" placeholder="Documento" name="documento" value={reclamo.usuario.documento} readOnly/>
                            </Form.Group>
                            <Form.Group controlId="Edificio">
                                <Form.Label>Edificio</Form.Label>
                                <Form.Control type="text" placeholder="Edificio" name="codigoEdificio" readOnly value={reclamo.edificio.nombre} required/>
                            </Form.Group>
                            <Form.Group controlId="Ubicacion">
                                <Form.Label>Ubicacion</Form.Label>
                                <Form.Control type="text" placeholder="Ubicacion" name="ubicacion" readOnly value={reclamo.ubicacion} required/>
                            </Form.Group>
                            { reclamo.unidad && (
                                <Form.Group controlId='Unidad'>
                                    <Form.Label>Unidad</Form.Label>
                                    <Form.Control type='text' placeholder='Unidad' name='unidad' readOnly value={`Piso: ${reclamo.unidad.piso} y Numero: ${reclamo.unidad.numero}`} required/>
                                </Form.Group>
                            )}
                            <Form.Group controlId="Descripcion">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control as="textarea" placeholder="Descripcion" name="descripcion" value={reclamo.descripcion} readOnly required/>
                            </Form.Group>
                            <Form.Group controlId="Imagenes">
                                <Form.Label>Imagenes</Form.Label>
                            {/* <Form.Control type="file" name="imagenes" accept='image/*' multiple onChange={mostrarImagenes} required/> */}
                            </Form.Group>
                            <div className='flex  gap-8'>
                                {reclamo.imagenes.map((imagen) => (
                                    <div className='flex justify-around items-center' >
                                        <img className='w-[100px]'
                                            src={imagen.direccion}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form>

                    )}
            </div>
        </div>
        
    )
}

export default Reclamo;