import React, { useState, useEffect } from 'react';
import './Login.css';
import imagenAdmin from '../../recursos/adm.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { setInterval } from 'core-js';

//Dentro de la función puedo hacer lógica


//Iniciar Sesion
function LoginComponente(){
  const navigate = useNavigate();

	//Control para cambiar de pantalla
	const [logeado, setLogeado] = useState(false);

	//Persona
	const [persona, setPersona] = useState({documento:'', password:''});

	//para perfil
	const [usuario, setUsuario] = useState(null);
	// const [estaUsuario, setEstaUsuario] = useState(false);


	//Guarda a la persona con sus datos
	const manejarCambioEntrada = (e) => {
	  setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const logueado = () => {
	console.log("refresh")
	setInterval(() => {
		if (logeado && usuario){
			navigate('/home', { state: { usuario: usuario } });
		}
	},200)
  }

  const login = async () => {
	try {
	  const respuesta = await fetch('http://localhost/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  
		},
		body: JSON.stringify(
		  persona
		),
	  });
	  if (respuesta.ok) {
		return await respuesta.json();
	  }
	  return null;
	} catch (error) {
	  console.log('Error de red', error);
	  return false;
	}
  };

	//Verifica que al menos que se ingresó algo en el "docmuento"
	const verificarInputs = () =>{
	  const documento = document.getElementById('documento').value;
	  if (documento !== ''){
		return true
	  }
	  else{
		return false
	  }
	}

	async function IniciarSesion() {
	  if (!verificarInputs()){
		alert("Complete con sus datos");
		return;
	  }

	  const resultadoLogin = await login();

	  if (!resultadoLogin) {
		alert('No se pudo iniciar sesión');
		return;
	  }

	  setUsuario(resultadoLogin);
	  setLogeado(true);
	  return
	}


	function IngresarAdmin(){
	  navigate('/login-administrador');
	}

	logueado()
		
	return(
		<div className='Login'>
		  {!logeado ? (
			//Usuario no autenticado, muestro el formulario Login
			<div className='contenedor-datos'>
			  <h1 className='bienvenido'>¡Bienvenido/a!</h1>
				<form>
				  <input className='globo' type="text" placeholder="Documento" name="documento" id='documento' value={persona.documento} onChange={manejarCambioEntrada} required/>
				  <input className='globo' type="password" placeholder="Contraseña" name="password" id='password' value={persona.password} onChange={manejarCambioEntrada} required/>
				  <button className='globo-boton' type='button' onClick={() => IniciarSesion()}>Iniciar Sesion </button>
				</form>
				<img className="imagenRol" src={imagenAdmin} alt="ingresar admin" onClick={IngresarAdmin} title="Ingresar Administración"></img>

			</div>
		  ) : (

			null
			
		  )};  
		</div>
	);
}


export default LoginComponente;