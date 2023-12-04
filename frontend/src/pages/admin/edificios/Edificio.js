import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../../componentes/navbarAdmin/navbar";
import { Spinner, Form, Button, Table } from "react-bootstrap";

function Edificio(){

    const params = useParams();
    const [edificio, setEdificio] = useState({});
    const [loading, setLoading] = useState(true);
    const [unidades, setUnidades] = useState([]);
    const [form , setForm] = useState({nombre:"", direccion:""})
    const [unidadesForm, setUnidadesForm] = useState({piso:"", numero:""})

    useEffect(() => {
        const fetchEdificio = async () => {
            let response = await fetch(`http://localhost/edificios/${params.codigo}`);
            let data = await response.json();
            setEdificio(data);
            
        }
        const fetchUnidades = async () => {
            let response = await fetch(`http://localhost/edificios/${params.codigo}/unidades`);
            let data = await response.json();
            setUnidades(data);
        
        }
        const fetchAll = async () => {
            await fetchEdificio();
            await fetchUnidades();
            setLoading(false);
        }
        fetchAll();
    }, [loading])

    const manejarCambioEntrada = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form)
    };

    const editarEdificio = async (e) => {
        e.preventDefault();
        const nuevoForm = {
            nombre: form.nombre ? form.nombre : edificio.nombre,
            direccion: form.direccion ? form.direccion : edificio.direccion
        }
        let response = await fetch(`http://localhost/edificios/${params.codigo}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoForm)
        })
        if (response.status === 200){
            alert("Edificio editado");
            setLoading(true);
        }
    }

    const eliminarEdificio = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/edificios/${params.codigo}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })
        if (response.status === 200){
            alert("Edificio eliminado");
            setLoading(true);
        }
    }

    const manejoDatos = (e) => {
        const { name , value } = e.target;
        setUnidadesForm(
            {
                ...unidadesForm, 
                [name]: value,
            }
        );
    };

    const eliminarUnidad = async (e, unidad) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/unidades/codigo=${edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}`, {
            method: 'DELETE'
        })
        if (response.status === 200){
            alert("Unidad eliminada");
            setLoading(true);
        }
    }

    const crearUnidad = async (e) => {
        const nuevoForm = {
            piso: unidadesForm.piso,
            numero: unidadesForm.numero,
            codigoEdificio: edificio.codigo
        }
        e.preventDefault();
        let response = await fetch(`http://localhost/unidades`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoForm)
        })
        if (response.status === 200){
            alert("Unidad creada");
            setLoading(true);
        }

    }

    return(
        <div className='flex flex-col h-full'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <Spinner animation="border" role="status"></Spinner>
                        <span>Cargando edificio... </span>
                    </div>
                ):(
                    <div className="flex flex-col gap-10">
                        <h1 className="text-center">{edificio.nombre}</h1>
                        <Form className=' bg-slate-200 flex flex-col gap-4 min-w-[500px] p-20 shadow-2xl rounded-2xl'>
                            <Form.Group controlId="Nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control name="nombre" type="text" placeholder={edificio.nombre} onChange={manejarCambioEntrada} />
                            </Form.Group>
                            <Form.Group controlId="Direccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control name="direccion" type="text" placeholder={edificio.direccion} onChange={manejarCambioEntrada} />
                            </Form.Group>
                            <div className="flex gap-4 w-full justify-end">
                                <Button onClick={(e) => {editarEdificio(e)}}>Aceptar</Button>
                                <Button variant="danger" onClick={(e) => {eliminarEdificio(e)}}><Link className="text-white no-underline" to="/edificios">Eliminar</Link></Button>
                            </div>
                        </Form>

                        <div className="bg-slate-200 flex flex-col gap-4 min-w-[500px] p-20 shadow-2xl rounded-2xl">
                            <h2 className="text-center">Unidades</h2>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th scope="col">Piso</th>
                                    <th scope="col">Numero</th>
                                    <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unidades.map((unidad) => (
                                        <tr>
                                            <td>{unidad.piso}</td>
                                            <td>{unidad.numero}</td>
                                            <td className="flex gap-2">
                                                <Button><a className="text-white no-underline" href={`/edificios/${edificio.codigo}/unidades/${unidad.piso}/${unidad.numero}`}>Ver</a></Button>
                                                <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarUnidad(e, unidad) }>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>        
                                        <td><input type="number" className="form-control" id="nombre" name="piso" placeholder="Piso" aria-label="Piso" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                        <td><input type="number" className="form-control" id="direccion" name="numero" placeholder="Numero" aria-label="Numero" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                        <td>
                                            <button type="submit" className="btn btn-success ms-1" onClick={crearUnidad}>Crear</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Edificio;