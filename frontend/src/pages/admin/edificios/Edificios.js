import React, {useEffect, useState} from 'react';
import NavBar from '../../../componentes/navbarAdmin/navbar';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function Edificios(){

    const [edificios, setEdificios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEdificios = async () => {
            let response = await fetch("http://localhost/edificios");
            let data = await response.json();
            setEdificios(data);
            setLoading(false);
        }
        fetchEdificios();
    },[loading]);

    const [form , setForm] = useState({
        nombre: '',
        direccion: ''
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

    const eliminarBoton = async (e, id) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/edificios/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })
        if (response.status === 200){
            alert("Edificio eliminado");
            setLoading(true);
        }
    }

    const crearBoton = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost/edificios", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        })
        if (response.status === 200){
            alert("Edificio creado");
            setLoading(true);
        }
    }

    return(
        <div className='flex flex-col h-full'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                <h1>Edificios</h1>
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <Spinner animation="border" role="status"></Spinner>
                        <span>Cargando edificios... </span>
                    </div>
                ):(
                    <div>
                        {edificios.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th scope="col">Numero</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {edificios.map((edificio) => (
                                        <tr>
                                            <td>{edificio.codigo}</td>
                                            <td>{edificio.nombre}</td>
                                            <td>{edificio.direccion}</td>
                                            <td className='flex gap-2'>
                                                <Button><Link className='text-white no-underline' to={`${edificio.codigo}`}>Ver</Link></Button>
                                                <Button variant="danger" onClick={ (e) => eliminarBoton(e, edificio.codigo) }>Eliminar</Button>
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>        
                                        <td>#</td>
                                        <td><input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                        <td><input type="text" className="form-control" id="direccion" name="direccion" placeholder="Dirección" aria-label="Dirección" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                        <td>
                                            <button type="submit" className="btn btn-success ms-1" onClick={crearBoton}>Crear</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        ):(
                            <h3>No hay Edificios</h3>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
};

export default Edificios;