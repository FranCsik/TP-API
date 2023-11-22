import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Unidad(){

    const params = useParams();
    
    const [inquilinos, setInquilinos] = useState([]);
    const [propietarios, setPropietarios] = useState([]);
    const [personas, setPersonas] = useState([{"documento": "66666", "nombre": "The Punisher"}, {"documento": "11111", "nombre": "Duki"}, {"documento": "123456", "nombre": "Juan Perez"}, {"documento": "5555", "nombre": "Lionel Messi"}, {"documento": "123456", "nombre": "Juan Perez"}, {"documento": "5555", "nombre": "Andres"}]);
    const [habitado, setHabitado] = useState("No habitado");
    const [unidad, setUnidad] = useState([]);
   
    useEffect(() => {
        const url = `http://localhost:8080/unidades/codigo=${params.codigo}&piso=${params.piso}&numero=${params.numero}`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if(res.hasOwnProperty('error')){
                    alert(res.message);
                    window.location.replace("http://localhost:3000/edificios");
                } else {
                    setUnidad(res);
                    setInquilinos(res.inquilinos);
                    setPropietarios(res.duenios);
                    if(res.habitado){
                        setHabitado("Habitado");
                    }
                }
            });
    },[]);

    useEffect(() => {
        const url = `http://localhost:8080/personas`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if(res.hasOwnProperty('error')){
                    alert(res.message);
                    window.location.replace("http://localhost:3000/edificios");
                } else {
                    setPersonas(res);
                }
            })
    });

    
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

    const agregarInquilino = (e) => {
        e.preventDefault();
        if (inquilinos.length == 0) {
            const url = `http://localhost:8080/unidades/codigo=${unidad.edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}/alquilar`;
            fetch(url, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify([{
                    documento: form.dniInquilino,
                }])
                
            }
            ).then( () => {
                alert("Unidad alquilada");
                window.location.reload();
            })
        } else {
           const url = `http://localhost:8080/unidades/codigo=${unidad.edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}/agregarInquilino/${form.dniInquilino}`;
           fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({})
            }
            ).then( () => {
                alert("Unidad alquilada");
                window.location.reload();
            })
        }


    }

    const agregarPropietario = (e, dni) => {
        e.preventDefault();
        const url = `http://localhost:8080/unidades/codigo=${unidad.edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}/agregarDuenio/${dni}`;
        fetch(url, {
         method: 'POST',
         headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'no-cors'},
         body: JSON.stringify({})
         }
         ).then( () => {
             alert("Propietario agregado");
             window.location.reload();
         })

    }

    const transferirUnidad = (e, dni) => {
        e.preventDefault();
        const url = `http://localhost:8080/unidades/codigo=${unidad.edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}/transferir`;
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify([{
                documento: dni
            }])
        }
        ).then( () => {
            alert("Unidad transferida");
            window.location.reload();
        })
    }

    const liberarUnidad = (e, unidad) => {
        e.preventDefault();
        const url = `http://localhost:8080/unidades/codigo=${unidad.edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}/liberar`;
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                codigo: unidad.edificio.codigo,
                piso: unidad.piso,
                numero: unidad.numero
            })
        }
        ).then( () => {
            alert("Unidad liberada");
            window.location.reload();
        })
    }

    const habitarUnidad = (e, unidad) => {
        e.preventDefault();
        const url = `http://localhost:8080/unidades/codigo=${unidad.edificio.codigo}&piso=${unidad.piso}&numero=${unidad.numero}/habitar`;
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                codigo: unidad.edificio.codigo,
                piso: unidad.piso,
                numero: unidad.numero
            })
        }
        ).then( () => {
            alert("Unidad habitada");
            window.location.reload();
        })
    }

    return(
        <div>
        <h1 className="text-center my-3 pb-3">Edificio {params.codigo}, piso {params.piso}, número {params.numero} ({habitado})</h1>

            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <button type="submit" className="btn btn-primary w-100" onClick={ (e) => {liberarUnidad(e, unidad)}}>Liberar</button>
                    </div>
                    <div class="col-6">
                        <button type="submit" className="btn btn btn-secondary w-100" onClick={ (e) => {habitarUnidad(e, unidad)} }>Habitar</button>
                    </div>
                </div>
            </div>


        
        <section>



            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-8">
                    <div className="card rounded-3">
                    <div className="card-body p-">

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
                                        <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, inquilino.documento) }>Ver Persona</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        
                                    <th scope="row">#</th>
                                    <td>
                                    <select class="form-control" id="dniInquilino" name="dniInquilino" onChange={manejoDatos} >
                                            <option disabled selected={true}>Seleccione un inquilino</option>
                                        {personas.map((persona) => (
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

                            {propietarios.map((propietario) => (
                                <tr>
                                    <th scope="row">{propietario.documento}</th>
                                    <td>{propietario.nombre}</td>
                                    <td>
                                        <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, propietario.documento) }>Ver Persona</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        
                                    <th scope="row">#</th>
                                    <td>
                                    <select class="form-control" id="dniPropietario" name="dniPropietario" onChange={manejoDatos}>
                                            <option disabled selected={true}>Seleccione un propietario</option>
                                        {personas.map((persona) => (
                                            <option value={persona.documento}>{persona.nombre}, {persona.documento}</option>
                                        ))}
                                        
                                    </select>
                                    </td>

                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={ (e) => agregarPropietario(e, form.dniPropietario)}>Agregar</button>
                                        <button type="submit" className="btn btn-secondary" onClick={ (e) => transferirUnidad(e, form.dniPropietario) }>Transferir</button>
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