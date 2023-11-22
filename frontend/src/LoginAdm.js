import React, { useState } from 'react';
import imagenUsu from './recursos/usu.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

//Dentro de la función puedo hacer lógica


//Iniciar Sesion
//Registrarse
function LoginAdministradorComponente(){

  const navigate = useNavigate();

    //Control para cambiar de pantalla
    const [logeado, setLogeado] = useState(false);

    //Persona
    const [persona, setPersona] = useState({nombre:'', password:'', documento:''});

    //Llama al metodo buscarPersona del PerosnaController es de tipo GET
    const buscarPersona = async () => {
        try {
          const respuesta = await fetch(`http://localhost/personas/buscar?documento=${persona.documento}`);
      
          if (respuesta.ok) {
            const personaEncontrada = await respuesta.json();
            if (personaEncontrada) {
              console.log('La persona existe');
              return true;
            } else {
              console.log('La persona no existe');
              return false;
            }
          } else {
            console.log('Respuesta no existosa');
            return false;
          }
        } catch (error) {
          console.log('Error al buscar la persona o no se encuentra registrado');
          return false;
        }
      };
      

    //Guarda a la persona con sus datos
    const manejarCambioEntrada = (e) => {
        setPersona({ ...persona, [e.target.name]: e.target.value });
    };

    //Verifica que al menos que se ingresó algo en el "docmuento"
    const verificarInputs = () =>{
      //const nombre = document.getElementById('nombre').value;
      //const contrasenia = document.getElementById('password').value;
      const documento = document.getElementById('documento').value;
      if (documento !== ''){
        return true
      }
      else{
        return false
      }
    }

    async function IniciarSesion(){
        if (verificarInputs() === true){
            const resultadoBusqueda = await buscarPersona();
            console.log(resultadoBusqueda);  // true o false
            if (resultadoBusqueda === true){
                alert('Entraste a la plataforma')
                //Permiso para poder ir a la siguiente pantalla
                setLogeado(true);
                navigate('/home', { state: { persona: persona } });
             }
             else{
                alert('No existe el usuario. Registrese')
             }
        }
        else{
            alert('Complete con sus datos')
        }    
    }


    function IngresarUsuario(){
      navigate('/login');
    }
        
    return(
        <div className='Login'>
          {!logeado ? (
            //Usuario no autenticado, muestro el formulario Login
            <div className='contenedor-datos'>
              <h1 className='bienvenido'>¡Bienvenido/a admin!</h1>
                <form>
                  <input className='globo' type="text" placeholder="Nombre" name="nombre" id='nombre' value={persona.nombre} onChange={manejarCambioEntrada} required/>
                  <input className='globo' type="password" placeholder="Contraseña" name="password" id='password' value={persona.password} onChange={manejarCambioEntrada} required/>
                  <input className='globo' type="text" placeholder="Documento" name="documento" id='documento' value={persona.documento} onChange={manejarCambioEntrada} required/>
                  <button className='globo-boton' type='submit' onClick={() => IniciarSesion(persona)}>Iniciar Sesion </button>
                 
                </form>
                <img className="imagenRol" src={imagenUsu} alt="ingresar admin" onClick={IngresarUsuario} title="Ingresar Usuario"></img>
            </div>
          ) : (

            null
            
          )};  
            
        </div>
    );
}


export default LoginAdministradorComponente;