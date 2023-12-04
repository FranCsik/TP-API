import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setInterval } from 'core-js';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

//Dentro de la función puedo hacer lógica


//Iniciar Sesion
function LoginAdmin(){
  const navigate = useNavigate();

	const [logeado, setLogeado] = useState(false);
	const [persona, setPersona] = useState({documento:'', password:''});

	const manejarCambioEntrada = (e) => {
	  setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const logueado = () => {
	setInterval(() => {
		if (logeado){
			navigate('/home-admin');
		}
	},200)
  }

  const login = async () => {
	try {
	  const respuesta = await fetch('http://localhost/login-admin', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  persona
		),
	  });
      return respuesta.ok ? await respuesta.json() : null;
	} catch (error) {
	  console.log('Error de red', error);
	}
  };
  
	async function IniciarSesion() {
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


export default LoginAdmin;