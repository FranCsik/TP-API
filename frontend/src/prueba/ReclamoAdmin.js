import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function ReclamoAdmin() {
    
        const params = useParams();
        const [loading, setLoading] = useState(true);
        const [reclamo, setReclamo] = useState([]);
        const [form, setForm] = useState({descripcion: '', estado: ''});

        const estadosReclamo = ["nuevo", "abierto", "enProceso", "desestimado", "anulado", "terminado"]
    
        useEffect(() => {
            const fetchReclamos = async () => {
                const url = "http://localhost/reclamos/" + params.idReclamo;
                const res = await fetch(url);
                const json = await res.json();
                setReclamo(json);
                setLoading(false);
                setForm({
                    estado: json.estado,
                })
                console.log(reclamo);
            }

            fetchReclamos();
    
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

        const actualizarReclamo = async (e) => {
            e.preventDefault();
            const url = `http://localhost/reclamos/${params.idReclamo}`;
            const res = await fetch(url, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(form)
            });
            alert("Reclamo actualizado");
            window.location.reload();
        }

        return(
            <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-7">
                    <div className="card rounded-3">
                    <div className="card-body p-">
                        <h1 className="text-center my-3 pb-3">Reclamo: {reclamo.numero}</h1>

                        <p>Creador: { !loading ? `${reclamo.usuario.nombre} | ${reclamo.usuario.documento}`:  ""} </p>
                        <p>Edificio: { !loading ? `${reclamo.edificio.nombre} | ${reclamo.edificio.direccion}`:  ""} </p>
                        <p>Unidad: { !loading ? `piso ${reclamo.unidad.piso}, unidad ${reclamo.unidad.numero}`:  ""} </p>
                        <p>Ubicación: { !loading ? `${reclamo.ubicacion}`:  ""} </p>
                        <p>Descripcion: { !loading ? `${reclamo.descripcion}`:  ""} </p>

                        <label>Agregar detalles</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion" placeholder="Agregar detalles" aria-describedby="basic-addon2" value={form.descripcion} onChange={manejoDatos}/>
                        <label>Estado</label>
                        <select class="form-control" value={form.estado} name="estado" onChange={manejoDatos}>
                        {estadosReclamo.map((estado) => (
                            <option value={estado} defaultValue={ estado==form.estado?true:false}>{estado}</option>
                        ))}

                        </select>
                        <button type="submit" className="btn btn-success ms-1" onClick={actualizarReclamo}>Actualizar</button>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        )
}


export default ReclamoAdmin;