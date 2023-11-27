import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Unidad(){

    const params = useParams();

    const [personas, setPersonas] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [duenios, setDuenios] = useState([]);
    const [habitado, setHabitado] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUnidad = async () => {
            let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}`)
            let unidad = await response.json();
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
        setInquilinos(unidad.inquilinos);
        alert("Inquilino eliminado");
    }

    const eliminarDuenio = async (e, propietario) => {
        e.preventDefault();

        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/eliminarDuenio/${propietario.documento}`,{
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        })
        let unidad = await response.json();
        setDuenios(unidad.duenios);
        alert("Propietario eliminado");
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
        setInquilinos(unidad.inquilinos)
        alert("Unidad Alquilada");
    }

    const agregarPropietario = async (e) => {
        e.preventDefault();

        let response = await fetch(`http://localhost/unidades/codigo=${params.codigoEdificio}&piso=${params.piso}&numero=${params.numero}/agregarDuenio/${form.dniPropietario}`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
        })
        let unidad = await response.json();
        setDuenios(unidad.duenios);
        alert("Propietario agregado");

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
        setDuenios(unidad.duenios);
        alert("Unidad transferida");
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
        setHabitado(unidad.habitado);
        alert("Unidad liberada");
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
        setHabitado(unidad.habitado);
        alert("Unidad habitada");
    }

    function habitadoToString(habitado) {
        if (habitado) {
            return "Habitado";
        } else {
            return "Desocupado";
        }
    }

    return(
        <div>
        <h1 className="text-center my-3 pb-3">Edificio {params.codigoEdificio}, piso {params.piso}, número {params.numero} ({habitadoToString(habitado)})</h1>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary w-100" onClick={ (e) => {liberarUnidad(e)}}>Liberar</button>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn btn-secondary w-100" onClick={ (e) => {habitarUnidad(e)} }>Alquilar</button>
                    </div>
                </div>
            </div>


        
        <section>



            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-8">
                    <div className="card rounded-3">
                    <div className="card-body ">

                        <h2 className="text-center my-3 pb-3">Inquilinos</h2>


                        <table className="table mb-3">
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
                                        <th scope="row">{inquilino.documento}</th>
                                        <td>{inquilino.nombre}</td>
                                        <td>
                                            <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, inquilino.documento) }>Ver</button>
                                            <button type="submit" className="btn btn btn-danger ms-1" onClick={ (e) => eliminarInquilino(e, inquilino)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }

            

                            <tr>        
                                    <th scope="row">#</th>
                                    <td>
                                    <select className="form-control" id="dniInquilino" name="dniInquilino" onChange={manejoDatos} >
                                            <option disabled selected={true}>Seleccione un inquilino</option>
                                        {personas && 
                                            personas.map((persona) => (
                                            <option value={persona.documento}>{persona.nombre}, {persona.documento}</option>
                                        ))}
                                        
                                    </select>
                                    </td>

                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={ (e) => agregarInquilino(e)}>Agregar</button>
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
        </div>
        
    )
};

export default Unidad;