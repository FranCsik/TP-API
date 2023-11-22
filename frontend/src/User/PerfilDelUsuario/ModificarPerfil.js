import React, { useState } from 'react';
import './/MiPerfil.css';
import lapiz from '../../recursos/lapizmodificar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

function ModificarPerfilComponente(){

    const navigate = useNavigate();
    const location = useLocation();


    const [usuario, setUsuario] = useState(location.state && location.state.usuario);

    const [usuarioModificado, setUsuarioModificado] = useState({documento:usuario.documento, mail:'', password:'', nombre:''})

    const manejarEntradaUsuarioModificado = (e) =>{
        setUsuarioModificado({...usuarioModificado, [e.target.name]: e.target.value})
    }
    //TODO
    //- hacer metodo para manejar los cambios de entrada 
    //- llamar a la api para modificar persona

    const modificarPerfil = async () => {
        try {
            console.log("ENTRO")
            const respuesta = await fetch(`http://localhost/personas/${usuario.documento}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify((
                usuarioModificado
              )),
    
            });
            if (respuesta.ok) {
                irMiPerfil()
                alert('Perfil actualizado con exito');
            } else {
                alert('No se pudo actualizar su perfil.');
            }
            } catch (error) {
              alert('Error de red');
            }
    };


function irMiPerfil(){
    navigate('/perfil', {state: {usuario : usuarioModificado}})
}

    return(
        <div className='Home'>
            <NavBarComponente/>
            <div>
                
                <div className='datos-usuario'>
                    <h5>Nombre actual: {usuario.nombre}</h5>
                    <input className='globo' type="text" placeholder="Nombre" name="nombre" id='nombre' value={usuarioModificado.nombre} onChange={manejarEntradaUsuarioModificado} />
                    <h5>Numero de Documento:</h5>
                    <p style={{backgroundColor:"white"}}>{usuario.documento}</p>
                    <h5>Mail actual:  {usuario.mail}</h5> <h6></h6>
                    <input className='globo' type="text" placeholder="Mail" name="mail" id='mail' value={usuarioModificado.mail} onChange={manejarEntradaUsuarioModificado}/>
                    <h5>Contraseña actual: {usuario.password}</h5>
                    <input className='globo' type="text" placeholder="Constraseña" name="password" id='password' value={usuarioModificado.password} onChange={manejarEntradaUsuarioModificado} />
                    <br></br>
                    <button className='btn-guardar' onClick={() => {modificarPerfil()}}>Guardar Cambios</button>
                </div>
            </div>
        </div>
    );
}

export default ModificarPerfilComponente;