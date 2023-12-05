import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../../componentes/navbarAdmin/navbar';
import { Button, Spinner, Form } from 'react-bootstrap';


function Usuario(){
    
        const [loading, setLoading] = useState(true);
        const [usuario, setUsuario] = useState({});
        const params = useParams();
        const [form , setForm] = useState({});
        const [administrador, setAdministrador] = useState("");
        const [administradorForm, setAdministradorForm] = useState("");

    
        useEffect(() => {
            const fetchUsuario = async () => {
                const res = await fetch(`http://localhost/personas/${params.documento}`);
                const data = await res.json();
                console.log(data)
                setUsuario(data);
                setForm(data);
            }
            const fetchAdministrador = async () => {
                const response = await fetch(`http://localhost/administradores/${usuario.documento}`);
                if (response.status === 200){
                    setAdministrador("Administrador");
                    setAdministradorForm("Administrador");
                }else{
                    setAdministrador("Usuario");
                    setAdministradorForm("Usuario");
                }
                
            }
            const fetchAll = async () => {
                await fetchUsuario();
                await fetchAdministrador();
                console.log("ROLES", administrador, administradorForm);
                setLoading(false);
            }
            fetchAll();
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
            const nuevoForm = {
                nombre: form.nombre ? form.nombre : usuario.nombre,
                documento: form.documento ? form.documento : usuario.documento,
                password: form.password ? form.password : usuario.password,
                mail: form.mail ? form.mail : usuario.mail,
            }
            let response = await fetch(`http://localhost/personas/${params.documento}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(form)
            })
            if (response.status !== 200){
                alert("No se pudo actualizar el usuario");
                return;
            }
            if (administradorForm === administrador){
                alert("El usuario ya tiene el rol " + administradorForm)
                return
            }
            if (administradorForm === "Administrador" && administrador === "Usuario"){
                let response = await fetch(`http://localhost/administradores/${usuario.documento}`, {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                })

                if (response.status !== 200){
                    alert("El usuario ya tiene el rol administrador");
                    return;
                }
            }
            else if (administradorForm === "Usuario" && administrador === "Administrador"){
                let response = await fetch(`http://localhost/administradores/${usuario.documento}`, {
                    method: 'DELETE',
                    headers: {'Content-Type':'application/json'},
                })
                if (response.status !== 200){
                    alert("El usuario ya tiene el rol usuario");
                    return;
                }
            }
            

            alert("Usuario actualizado");
            setLoading(true);
        }

        const eliminarUsuario = async (e) => {
            e.preventDefault();
            let response = await fetch(`http://localhost/personas/${params.documento}`, {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
            })
            if (response.status === 200){
                alert("Usuario eliminado");
                setLoading(true);
            }
            else{
                alert("No se pudo eliminar el usuario");
                return;
            }
        }

        const manejarSelect = (e) => {
            setAdministradorForm(e.target.value);
        }

        return(
            <div className='flex flex-col h-full'>
            <NavBar/>
            <div className="flex flex-col h-full items-center gap-6 overflow-auto p-6">
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <Spinner animation="border" role="status"></Spinner>
                        <span>Cargando usuario... </span>
                    </div>
                ):(
                    <div className="flex flex-col gap-10">
                        <h1 className="text-center">{usuario.nombre}</h1>
                        <Form className=' bg-slate-200 flex flex-col gap-4 min-w-[500px] p-20 shadow-2xl rounded-2xl'>
                            <Form.Group controlId='documento'>
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type='text' name="documento" value={usuario.documento} readOnly/>
                            </Form.Group>
                            <Form.Group controlId='nombre'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type='text' name="nombre" placeholder={usuario.nombre} onChange={manejoDatos}/>
                            </Form.Group>
                            <Form.Group controlId='mail'>
                                <Form.Label>Mail</Form.Label>
                                <Form.Control type='email' name="mail" placeholder={usuario.mail ? usuario.mail: "Ingresar mail"} onChange={manejoDatos}/>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name="password" placeholder={usuario.password? usuario.password : "Ingresar contraseña"} onChange={manejoDatos}/>
                            </Form.Group>
                            <Form.Group controlId='rol'>
                                <Form.Label>Rol</Form.Label>
                                <Form.Select onChange={manejarSelect}>
                                    <option default value={administrador === "Administrador" ? "Administrador" : "Usuario"}>{administrador === "Administrador" ? "Administrador" : "Usuario"}</option>
                                    {administrador === "Administrador" ? <option value="Usuario">Usuario</option> : <option value="Administrador">Administrador</option>}
                                </Form.Select>
                            </Form.Group>
                            <div className='flex gap-2 justify-end'>
                                <Button onClick={actualizarUsuario}>Aceptar</Button>
                                <Button variant='danger' onClick={eliminarUsuario}><Link className='text-white no-underline' to='/usuarios'>Eliminar</Link></Button>
                            </div>
                        </Form>
                        
                    </div>
                )}
            </div>
        </div>
            
        )
}


export default Usuario;

{/* <section className="vh-100">
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
        </section> */}