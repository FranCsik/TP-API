import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setInterval } from 'core-js';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

//Dentro de la función puedo hacer lógica


//Iniciar Sesion
function LoginComponente(){
  const navigate = useNavigate();

	//Control para cambiar de pantalla
	const [logeado, setLogeado] = useState(false);

	//Persona
	const [persona, setPersona] = useState({documento:'', password:''});

	//Guarda a la persona con sus datos
	const manejarCambioEntrada = (e) => {
	  setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const logueado = () => {
	console.log("refresh")
	setInterval(() => {
		if (logeado){
			navigate('/home');
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


	async function IniciarSesion() {
		console.log(persona)
	  if (persona.documento === '' || persona.password === '') {
		alert('Por favor ingrese todos los datos');
		return;
	  }

	  const resultadoLogin = await login();

	  if (!resultadoLogin) {
		alert('No se pudo iniciar sesión');
		return;
	  }

	  setPersona(resultadoLogin);
	  setLogeado(true);
	  localStorage.setItem('usuario', JSON.stringify(resultadoLogin));
	  return
	}


	function IngresarAdmin(){
	  navigate('/login-administrador');
	}

	logueado()
		
	return(
		<div className='flex h-full justify-center items-center gap-2'>
		    {!logeado ? (
				<div>
					<h1 className='text-center'>
						¡Bienvenido/a!
					</h1>
					<Form className=' bg-slate-200 flex flex-col gap-4 min-w-[500px] p-20 shadow-2xl rounded-2xl'>
						<Form.Group controlId="Documento">
							<Form.Label>Documento</Form.Label>
							<Form.Control type="text" placeholder="Documento" name="documento" onChange={manejarCambioEntrada} required />
						</Form.Group>
						<Form.Group controlId="Password">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control type="password" placeholder="Contraseña" name="password" onChange={manejarCambioEntrada} required />
						</Form.Group>
						<Button onClick={() => IniciarSesion()} variant='primary'>Iniciar sesion</Button>
					</Form>
				</div>
				



		
			
		    ):<div></div>}
	    </div>
	);
}


export default LoginComponente;

	//Usuario no autenticado, muestro el formulario Login
		// 	<div className='contenedor-datos'>
		// 	  <h1 className='bienvenido'>¡Bienvenido/a!</h1>
		// 		<form>
		// 		  <input className='globo' type="text" placeholder="Documento" name="documento" id='documento' value={persona.documento} onChange={manejarCambioEntrada} required/>
		// 		  <input className='globo' type="password" placeholder="Contraseña" name="password" id='password' value={persona.password} onChange={manejarCambioEntrada} required/>
		// 		  <button className='globo-boton' type='button' onClick={() => IniciarSesion()}>Iniciar Sesion </button>
		// 		</form>
		// 		<img className="imagenRol" src={imagenAdmin} alt="ingresar admin" onClick={IngresarAdmin} title="Ingresar Administración"></img>

		// 	</div>
		//   ) : (

		// 	null