import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Table, Spinner } from 'react-bootstrap';
import NavBar from '../../../componentes/navbarAdmin/navbar';

function Usuarios(){

    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [form , setForm] = useState({
        nombre: '',
        dni: ''
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            const res = await fetch("http://localhost/personas");
            const data = await res.json();
            setUsuarios(data);
            setLoading(false);
        }
        fetchUsuarios();
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

    const eliminarBoton = async (e, persona) => {
        e.preventDefault();
        let response = await fetch(`http://localhost/personas/${persona.documento}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })

        if (response > 300){
            alert("Error al eliminar el usuario");
            return
        }
        
        if (response.status === 200){
            alert("Usuario eliminado");
            setLoading(true);
        }
    }

    const crearBoton = async (e) => {
        e.preventDefault();
        if (form.nombre === '' || form.dni === ''){
            alert("Complete todos los campos");
            return
        }
        const nuevoForm = {
            documento: form.dni,
            nombre: form.nombre,
            password: "",
            mail:""
        }

        let response = await fetch("http://localhost/personas", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevoForm)
        })
        if (response > 300){
            alert("Error al crear el usuario");
            return
        }

        if (response.status === 200){
            alert("Usuario creado");
            setLoading(true);
        }

    }

    return(
        <div className='flex flex-col h-full'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                <h1>Usuarios</h1>
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <Spinner animation="border" role="status"></Spinner>
                        <span>Cargando usuarios... </span>
                    </div>
                ):(
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">DNI</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>        
                                    <td><input type="text" className="form-control" name="nombre" placeholder="Nombre" aria-label="Piso" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                    <td><input type="text" className="form-control" name="dni" placeholder="DNI" aria-label="Numero" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={crearBoton}>Crear</button>
                                    </td>
                                </tr>
                                {usuarios.map((usuario) => (
                                    <tr>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.documento}</td>
                                        <td>
                                            <div className='flex gap-2'>
                                                <button type="submit" className="btn btn-primary ms-1"><a className='text-white no-underline' href={`/usuarios/${usuario.documento}`}>Ver</a></button>
                                                <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarBoton(e, usuario) }>Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    )
};


export default Usuarios;