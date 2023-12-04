import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Unidades(){

    const [loading, setLoading] = useState(true);
    const params = useParams();

    const [unidades, setUnidades] = useState([]);
    const [edificio, setEdificio] = useState([]);

    useEffect(() => {
        const fetchEdificio = async () => {
            const url = "http://localhost/edificios/" + params.id;
            const res = await fetch(url);
            const json = await res.json();
            setEdificio(json);
        }
        const fetchUnidades = async () => {
            const url = "http://localhost/edificios/" + params.id + "/unidades";
            const res = await fetch(url);
            const json = await res.json();
            setUnidades(json);
        }
        
        const fetchAll = async () => {
            await fetchEdificio();
            await fetchUnidades();
            setLoading(false);
        }

        fetchAll();

    },[loading]);





    const [form , setForm] = useState({
        piso: '',
        numero: ''
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
        const url = "http://localhost/edificios/borrar";
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({codigo: id})
        }
        ).then( () => {
            alert("Unidad eliminada");
            window.location.reload();
        })
    }

    const crearBoton = (e) => {
        e.preventDefault();
        const url = "http://localhost/edificios/crear";
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        }
        ).then( () => {
            alert("Unidad creada");
            window.location.reload();
        })

    }

    const verDetalle = (e, unidad) => {
        e.preventDefault();
        window.location.href = "/unidad/" + unidad.edificio.codigo + "/" + unidad.piso + "/" + unidad.numero;
    }



    
    return(
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-7">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h1 className="text-center my-3 pb-3">{edificio.nombre}, {edificio.direccion}</h1>


                        <table className="table mb-4">
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
                                    <td>
                                        <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarBoton(e, unidad.id) }>Borrar</button>
                                        <button type="submit" className="btn btn-primary ms-1" onClick={ (e) => verDetalle(e, unidad)}>Detalle</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        

                                    <td><input type="number" className="form-control" id="nombre" name="piso" placeholder="Piso" aria-label="Piso" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
                                    <td><input type="number" className="form-control" id="direccion" name="numero" placeholder="Numero" aria-label="Numero" aria-describedby="basic-addon2" onChange={manejoDatos}/></td>
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


export default Unidades;