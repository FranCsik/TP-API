import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Usuarios(){

    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const params = useParams();
    
    
    const [form , setForm] = useState({
        piso: '',
        numero: ''
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            const url = "http://localhost:8080/personas";
            const res = await fetch(url);
            const json = await res.json();
            setUsuarios(json);
            console.log(json);
        }

        fetchUsuarios();
        setLoading(false);
        

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

    const eliminarBoton = (e, persona) => {
        e.preventDefault();
        const borrarUsuario = async () => {
            const url = `http://localhost:8080/personas/${persona.documento}`;
            const res = await fetch(url, {
                method: 'delete',
                headers: {'Content-Type':'application/json'},
            });
            alert("Persona eliminada");
            window.location.reload();
        }   

        borrarUsuario();
    }

    const crearBoton = (e) => {
        e.preventDefault();
        const crearPersona = async () => {
            const url = "http://localhost:8080/personas";
            const res = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(form)
            });
            const json = await res.json();
            if(json.error == "Internal Server Error"){
                alert("Error al crear la persona");
            }else {
                alert("Persona creada");
                window.location.reload();
            }
        }   

        crearPersona();

    }

    const verDetalle = (e, persona) => {
        e.preventDefault();
        window.location.href = `/usuarios/${persona.documento}`;
    }



    
    return(
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-7">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h1 className="text-center my-3 pb-3">Usuarios</h1>


                        <table className="table mb-4">
                        <thead>
                            <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>        

                                <td><input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" aria-label="Piso" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                <td><input type="text" className="form-control" id="direccion" name="documento" placeholder="DNI" aria-label="Numero" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                <td>
                                    <button type="submit" className="btn btn-success ms-1" onClick={crearBoton}>Crear</button>
                                </td>
                            </tr>
                            {usuarios.map((usuario) => (
                                <tr>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.documento}</td>
                                    <td>
                                        <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarBoton(e, usuario) }>Borrar</button>
                                        <button type="submit" className="btn btn-primary ms-1" onClick={ (e) => verDetalle(e, usuario)}>Modificar</button>
                                    </td>
                                </tr>
                            ))}

                
                        </tbody>
                        </table>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )

};


export default Usuarios;