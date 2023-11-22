import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import NavBarAdminComponente from '../UserAdmin/navbar/navbar';

function Edificios(){

    const [edificios, setEdificios] = useState([]);
    useEffect(() => {
        const url = "http://localhost:8080/edificios";
        fetch(url).then(res => res.json()).then(res => setEdificios(res));
    },[]);

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

    const eliminarBoton = (e, id) => {
        e.preventDefault();
        const url = "http://localhost:8080/edificios/borrar";
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({codigo: id})
        }
        ).then( () => {
            alert("Edificio eliminado");
            window.location.reload();
        })
    }

    const crearBoton = (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/edificios/crear";
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        }
        ).then( () => {
            alert("Edificio creado");
            window.location.reload();
        })

    }

    const unidadesBoton = (e, id) => {
        e.preventDefault();
        window.location.href = "/edificios/" + id;
    }

    return(
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-7">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h1 className="text-center my-3 pb-3">Edificios</h1>


                        <table className="table mb-4">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {edificios.map((edificio) => (
                                <tr>
                                    <th scope="row">{edificio.codigo}</th>
                                    <td>{edificio.nombre}</td>
                                    <td>{edificio.direccion}</td>
                                    <td>
                                        <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarBoton(e, edificio.codigo) }>Elim.</button>
                                        <button type="submit" className="btn btn-success ms-1">Editar</button>
                                        <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, edificio.codigo) }>Ver unidades</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        
                                    <th scope="row">#</th>
                                    <td><input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                    <td><input type="text" className="form-control" id="direccion" name="direccion" placeholder="Dirección" aria-label="Dirección" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={crearBoton}>Crear</button>
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
    )

};

export default Edificios;