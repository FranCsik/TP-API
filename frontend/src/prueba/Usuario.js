import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';


function Usuarios(){
    
        const [loading, setLoading] = useState(true);
        const [usuario, setUsuario] = useState([]);
        const params = useParams();
        
        
        const [form , setForm] = useState({});

    
        useEffect(() => {
            const fetchUsuario = async () => {
                const url = `http://localhost:8080/personas/${params.id}`;
                const res = await fetch(url);
                const json = await res.json();
                setUsuario(json);
                setForm(json);
            }
    
            fetchUsuario();
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

        const actualizarUsuario = async (e) => {
            e.preventDefault();
            const url = `http://localhost:8080/personas/${params.id}`;
            const res = await fetch(url, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(form)
            });
            alert("Usuario actualizado");
            window.location.reload();
        }



        return(
            <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-7">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h1 className="text-center my-3 pb-3">{usuario.nombre}, {usuario.documento}</h1>



                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" aria-describedby="basic-addon2" value={form.nombre} onChange={manejoDatos}/>
                        <input type="text" className="form-control" id="documento" name="documento" placeholder="Documento" aria-describedby="basic-addon2" value={form.documento} onChange={manejoDatos}/>
                        <input type="text" className="form-control" id="contrasenia" name="contrasenia" placeholder="contrasenia" aria-describedby="basic-addon2" value={form.contrasenia} onChange={manejoDatos}/>
                        <input type="email" className="form-control" id="mail" name="mail" placeholder="mail" aria-describedby="basic-addon2" value={form.mail} onChange={manejoDatos}/>
                        <button type="submit" className="btn btn-success ms-1" onClick={actualizarUsuario}>Actualizar</button>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        )
}


export default Usuarios;