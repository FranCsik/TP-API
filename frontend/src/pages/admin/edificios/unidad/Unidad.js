import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../../../componentes/navbarAdmin/navbar';
import { Spinner, Form, Button, Table } from 'react-bootstrap';


function Unidad(){

    const params = useParams();
    const [edificio, setEdificio] = useState({});
    const [unidad, setUnidad] = useState({});
    const [personas, setPersonas] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [duenios, setDuenios] = useState([]);
    const [habitado, setHabitado] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchEdificio = async () => {
            let response = await fetch(`http://localhost/edificios/${params.codigoEdificio}`);
            let data = await response.json();
            setEdificio(data);
        }
        const fetchUnidad = async () => {
            let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}`)
            let unidad = await response.json();
            setUnidad(unidad);
            setInquilinos(unidad.inquilinos);
            setDuenios(unidad.duenios);
            setHabitado(unidad.habitado);
        }
        const fetchPersonas = async ()  => {
            let response = await fetch(`http://localhost/personas`)
            setPersonas(await response.json());
        }

        const fetchAll = async () => {
            await fetchUnidad();
            await fetchPersonas();
            await fetchEdificio()
            setLoading(false);
        }
        fetchAll();
    }, [loading]);

    
    const [form , setForm] = useState({
        dniInquilino: '',
        dniPropietario: ''
    });

    const manejoDatos = (e) => {
        const { name , value } = e.target;
        setForm(
            {
                ...form, 
                [name]: value,
            }
        );
    };

    const unidadesBoton = (e, id) => {
        e.preventDefault();

    }

    const eliminarInquilino = async (e, inquilino) => {
        e.preventDefault();

        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/eliminarInquilino/${inquilino.documento}`,{
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })
        let unidad = await response.json();
        alert("Inquilino eliminado");
        setLoading(true);
    }

    const eliminarDuenio = async (e, propietario) => {
        e.preventDefault();

        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/eliminarDuenio/${propietario.documento}`,{
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })
        let unidad = await response.json();
        alert("Propietario eliminado");
        setLoading(true);
    }

    const agregarInquilino = async (e) => {
        e.preventDefault();
        if (!habitado){
            alert("La unidad no está alquilada");
            return;
        }
        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/agregarInquilino/${form.dniInquilino}`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
        });
        let unidad = await response.json();
        alert("Unidad Alquilada");
        setLoading(true);
    }

    const agregarPropietario = async (e) => {
        e.preventDefault();

        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/agregarDuenio/${form.dniPropietario}`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
        })
        let unidad = await response.json();
        alert("Propietario agregado");
        setLoading(true);
    }

    const transferirUnidad = async (e) => {
        e.preventDefault();
        console.log(form.dniPropietario)
        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/transferir`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify([{
                documento: form.dniPropietario
            }])
        })
        let unidad = await response.json();
        alert("Unidad transferida");
        setLoading(true);
    }

    const liberarUnidad = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/liberar`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                codigo: params.codigo,
                piso: params.piso,
                numero: params.numero
            })
        })
        let unidad = await response.json();
        alert("Unidad liberada");
        setLoading(true);
    }

    const habitarUnidad = async (e) => {
        e.preventDefault();

        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/habitar`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                codigo: params.codigo,
                piso: params.piso,
                numero: params.numero
            })
        })
        let unidad = await response.json();
        alert("Unidad habitada");
        setLoading(true);
    }

    function habitadoToString(habitado) {
        if (habitado) {
            return "Alquilado";
        } else {
            return "No Alquilado";
        }
    }

    const [formUnidad , setFormUnidad] = useState({})

    const manejoDatosUnidad = (e) => {
        const { name , value } = e.target;
        setFormUnidad(
            {
                ...formUnidad, 
                [name]: value,
            }
        );
    }

    const editarUnidad = async (e) => {
        e.preventDefault();
        const nuevoForm = {
            piso: formUnidad.piso ? formUnidad.piso : unidad.piso,
            numero: formUnidad.numero ? formUnidad.numero : unidad.numero,
            codigoEdificio: params.codigoEdificio
        }
        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoForm)
        })
        alert("Unidad editada");
        setLoading(true);
    }

    const eliminarUnidad = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}`,{
            method: 'DELETE',
        })
        alert("Unidad eliminada");
        setLoading(true);
    }



    return(
        <div className='flex flex-col h-full gap-10'>
            <NavBar/>
            {loading ? (
                <div className="flex flex-col justify-center items-center gap-2 h-full">
                    <Spinner animation="border" role="status"></Spinner>
                    <span>Cargando Unidad... </span>
                </div>
            ):(
                <div className="flex flex-col h-full items-center gap-6 overflow-auto pb-4">
                    <div className='flex flex-col items-center'>
                        <h1>{edificio.nombre}</h1>
                        <h2>Piso: {unidad.piso} / Numero: {unidad.numero}</h2>
                        <h2>{habitadoToString(unidad.habitado)}</h2>
                    </div>
                    <div className='flex gap-40'>
                        <Button variant='secondary' onClick={ (e) => {liberarUnidad(e)}}>Liberar</Button>
                        <Button variant='success' onClick={ (e) => {habitarUnidad(e)} }>Alquilar</Button>
                    </div>
                    <Form className=' bg-slate-200 flex flex-col gap-4 min-w-[500px] p-20 shadow-2xl rounded-2xl'>
                        <Form.Group controlId="Piso">
                            <Form.Label>Piso</Form.Label>
                            <Form.Control type="text" name="piso" placeholder={unidad.piso} onChange={manejoDatosUnidad}/>
                        </Form.Group>
                        <Form.Group controlId="Numero">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control type="text" name="numero" placeholder={unidad.numero} onChange={manejoDatosUnidad}/>
                        </Form.Group>
                        <div className="flex gap-4 w-full justify-end">
                            <Button onClick={(e) => {editarUnidad(e)}}><Link className='text-white no-underline' to={`/edificios/${params.codigoEdificio}/unidades/${formUnidad.piso? formUnidad.piso:unidad.piso}/${formUnidad.numero ? formUnidad.numero : unidad.numero}`}>Aceptar</Link></Button>
                            <Button variant="danger" onClick={(e) => {eliminarUnidad(e)}}><Link className="text-white no-underline" to={`/edificios/${edificio.codigo}`}>Eliminar</Link></Button>
                        </div>
                    </Form>

                    <div className="bg-slate-200 flex flex-col gap-4 min-w-[500px] p-10 shadow-2xl rounded-2xl">
                        <h2 className="text-center">Inquilinos</h2>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th scope="col">DNI</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {inquilinos.map((inquilino) => (
                                    <tr>
                                        <td>{inquilino.documento}</td>
                                        <td>{inquilino.nombre}</td>
                                        <td>
                                            <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, inquilino.documento) }>Ver</button>
                                            <button type="submit" className="btn btn btn-danger ms-1" onClick={ (e) => eliminarInquilino(e, inquilino)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>        
                                    <td >#</td>
                                    <td>
                                        <Form.Select htmlSize={5} name="dniInquilino" onChange={manejoDatos} >
                                            <option value="" selected={true}>Seleccione un inquilino</option>
                                            {personas && 
                                                    personas.map((persona) => (
                                                    <option value={persona.documento}>{persona.nombre}, {persona.documento}</option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={ (e) => agregarInquilino(e)}>Agregar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div className="bg-slate-200 flex flex-col gap-4 min-w-[500px] p-10 shadow-2xl rounded-2xl">
                        <h2 className="text-center">Propietarios</h2>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th scope="col">DNI</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {duenios.map((propietario) => (
                                    <tr>
                                        <td>{propietario.documento}</td>
                                        <td>{propietario.nombre}</td>
                                        <td>
                                            <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, propietario.documento) }>Ver</button>
                                            <button type="submit" className="btn btn btn-danger ms-1" onClick={ (e) => eliminarDuenio(e, propietario)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>        
                                    <td >#</td>
                                    <td>
                                        <Form.Select htmlSize={5} name="dniPropietario" onChange={manejoDatos} >
                                            <option value="" selected={true}>Seleccione un propietario</option>
                                            {personas && 
                                                    personas.map((persona) => (
                                                    <option value={persona.documento}>{persona.nombre}, {persona.documento}</option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <div className='flex gap-2'>
                                            <button type="submit" className="btn btn-success ms-1" onClick={ (e) => agregarPropietario(e)}>Agregar</button>
                                            <button type="submit" className="btn btn-secondary" onClick={ (e) => transferirUnidad(e) }>Transferir</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Unidad;























{/* <div>
        <h1 className="text-center my-3 pb-3">Edificio {params.codigoEdificio}, piso {params.piso}, número {params.numero} ({habitadoToString(habitado)})</h1>

        
        <section>



            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-8">
                    <div className="card rounded-3">
                    
                    </div>
                </div>
                </div>
            </div>
        </section>
        

        <section>



            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-8">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h2 className="text-center my-3 pb-3">Propietarios</h2>


                        <table className="table mb-3">
                        <thead>
                            <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {duenios.map((propietario) => (
                                <tr>
                                    <th scope="row">{propietario.documento}</th>
                                    <td>{propietario.nombre}</td>
                                    <td>
                                        <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, propietario.documento) }>Ver</button>
                                        <button type="submit" className="btn btn btn-danger ms-1" onClick={ (e) => eliminarDuenio(e, propietario)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        
                                    <th scope="row">#</th>
                                    <td>
                                    <select className="form-control" id="dniPropietario" name="dniPropietario" onChange={manejoDatos}>
                                            <option disabled selected={true}>Seleccione un propietario</option>
                                        {personas.map((persona) => (
                                            <option value={persona.documento}>{persona.nombre}, {persona.documento}</option>
                                        ))}
                                        
                                    </select>
                                    </td>

                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={ (e) => agregarPropietario(e)}>Agregar</button>
                                        <button type="submit" className="btn btn-secondary" onClick={ (e) => transferirUnidad(e) }>Transferir</button>
                                    </td>
                                </tr>
                
                        </tbody>
                        </table>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </div> */}
     