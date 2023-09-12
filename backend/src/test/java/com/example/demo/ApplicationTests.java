package com.example.demo;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.controller.Controlador;
import com.example.demo.exceptions.EdificioException;
import com.example.demo.exceptions.PersonaException;
import com.example.demo.exceptions.ReclamoException;
import com.example.demo.exceptions.UnidadException;
import com.example.demo.views.Estado;
import com.example.demo.views.ReclamoView;



@SpringBootTest
@Transactional
class ApplicationTests {
	
	@Autowired
	Controlador controlador;
	

	@Test
	void contextLoads() {
	}

	@Test
	void hacerReclamoUnidadValido(){
		try {
			controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "departamento en el piso 10 y numero 6", "Hubo un problema en el retrete", Estado.nuevo);
			assert(controlador.reclamosPorEdificio(1).size() == 1);
		} catch (EdificioException | UnidadException | PersonaException e) {
			e.printStackTrace();
		}
	}

	@Test
	void reclamoUnidadInvalido(){
		try {
			controlador.agregarReclamo(1, 1, "10", "6", "CPA3449614", "departamento en el piso 10 y numero 6", "Hubo un problema en el retrete", Estado.nuevo);
		} catch (EdificioException | UnidadException | PersonaException e) {
			assert(e.getMessage().equals("La persona no tiene permisos para hacer el reclamo"));
			e.printStackTrace();
		}
	}

	@Test
	void reclamoPorUbicacionValido(){
		try {
			controlador.agregarReclamo(1, null, null, null, "CI 13230978", "Hall", "Se rompio la lampara del hall", Estado.nuevo);
			assert(controlador.reclamosPorEdificio(1).size() == 1);
		} catch (EdificioException | UnidadException | PersonaException e) {
			assert(e.getMessage().equals("La persona no tiene permisos para hacer el reclamo"));
			e.printStackTrace();
		}
	}

	@Test
	void reclamoPorUbicacionInvalido(){
		try {
			controlador.agregarReclamo(1, null, null, null, "DNI30868066", "Hall", "Se rompio la lampara del hall", Estado.nuevo);
		} catch (EdificioException | UnidadException | PersonaException e) {
			assert(e.getMessage().equals("La persona no tiene permisos para hacer el reclamo"));
			e.printStackTrace();
		}
	}

	@Test
	void cargarImagenAReclamo(){
		try {
			Integer numeroDeReclamo = controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "departamento en el piso 10 y numero 6", "Hubo un problema en el retrete", Estado.nuevo);
			assert(controlador.reclamosPorEdificio(1).size() == 1);
			controlador.agregarImagenAReclamo(numeroDeReclamo, "imagen", "jpeg");
			assert(controlador.reclamosPorEdificio(1).get(0).getImagenes().size() == 1);
		} catch (EdificioException | UnidadException | PersonaException | ReclamoException e) {
			e.printStackTrace();
		}
	}

	@Test 
	void cambiarEstadoDeReclamo(){
		// Se debe poder cambiar el estado de un reclamo, indicando cuales fueron las medidas tomadas.
		// Posibles estados de los reclamos son: Nuevo, abierto, en proceso, desestimado, anulado y terminado.
		try {
			Integer numeroDeReclamo = controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "departamento en el piso 10 y numero 6", "Hubo un problema en el retrete", Estado.nuevo);
			assert(controlador.reclamosPorEdificio(1).size() == 1);
			controlador.cambiarEstado(numeroDeReclamo, Estado.enProceso);
			assert(controlador.reclamosPorEdificio(1).get(0).getEstado().equals(Estado.enProceso));
		} catch (EdificioException | UnidadException | PersonaException | ReclamoException e) {
			e.printStackTrace();
		}
	}

	@Test
	void hacerReclamoComoDuenioTeniendoInquilino(){
		try {
			controlador.agregarReclamo(3, 239, "26", "5", "DNI31333789", "departamento en el piso 10 y numero 6", "Hubo un problema en la cama", Estado.nuevo);
		} catch (EdificioException | UnidadException | PersonaException e) {
			e.printStackTrace();
			assert(e.getMessage().equals("La persona no tiene permisos para hacer el reclamo"));
		}

	}

	@Test
	void reclamoPorEdificio(){
		try {
			controlador.agregarReclamo(3, 237, "27", "1", "DNI31333140", "departamento en el piso 10 y numero 6", "Hubo un problema en la tele", Estado.nuevo);
			controlador.agregarReclamo(3, 238, "26", "6", "DNI31333768", "departamento en el piso 10 y numero 6", "Hubo un problema en la silla", Estado.nuevo);
		} catch (EdificioException | UnidadException | PersonaException e) {
			e.printStackTrace();
			assert(false);
		}
		List<ReclamoView> reclamos = controlador.reclamosPorEdificio(3);
		assert(reclamos.size() == 2);
	}

	@Test
	void reclamosPorPersona(){
		try {
			controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "departamento en el piso 10 y numero 6", "Hubo un problema en el retrete", Estado.nuevo);
			assert(controlador.reclamosPorEdificio(1).size() == 1);
			assert(controlador.reclamosPorPersona("CI 13230978", null).size() == 1);
		} catch (EdificioException | UnidadException | PersonaException e) {
			e.printStackTrace();
		}
	}

	@Test
	void reclamosPorPersonaYEstado(){
		try {
			Integer reclamoUno = controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "departamento en el piso 10 y numero 6", "Hubo un problema en el retrete", Estado.nuevo);
			controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "departamento en el piso 10 y numero 6", "Hubo un problema en la lampara", Estado.nuevo);
			assert(controlador.reclamosPorEdificio(1).size() == 2);
			assert(controlador.reclamosPorPersona("CI 13230978", Estado.nuevo).size() == 2);
			controlador.cambiarEstado(reclamoUno, Estado.enProceso);
			assert(controlador.reclamosPorPersona("CI 13230978", Estado.nuevo).size() == 1);
			assert(controlador.reclamosPorPersona("CI 13230978", Estado.enProceso).size() == 1);
		} catch (EdificioException | UnidadException | PersonaException | ReclamoException e) {
			e.printStackTrace();
		}
	}


	@Test
	void registrarUsuarioQueHaceReclamo(){


	}

	@Test
	void identificarUsuarioValidoParaCargarReclamo(){
// 		Se debe identificar si el usuario es valido para cargar el reclamo. Si el desperfecto es parte de una sala comun del edificio, lo puede hacer cualquier persona. Por otro lado si es reclamo es sobre una unidad el reclamo lo puede hacer el dueño excepto que este alquilada, en ese caso lo debera hacer el inquilino.


	}

	@Test
	void solicitarDatosDeLaUnidad(){
		// 		Solicitar datos de la unidad del reclamo. Edificio, piso, numero de unidad. 
		// en caso de ser un lugar donde se encuentra el desperfecto o problema a reclamar se indicara claramente. Se requiere que el ingreso sea mínimo y cerrado.

	}

	@Test
	void solicitarDescripcionDelReclamo(){
		// Ingresar una descripcion por reclamo maximo 1000 caracteres
	}

	@Test
	void solicitarFotoDelReclamo(){
		// Se debe poder almacenar fotos (urls)
	}

	@Test
	void devolverNumeroReclamo(){
		//Al Hacer el reclamo debe devolver el numero de reclamo

	}

	@Test
	void consultarReclamosPorEdificio(){
		// Se debe poder consultar reclamos por edificio y su estado

	}

	@Test
	void registrarAcessoALaAplicacion(){
		//registrar acceso a la aplicacion con usuario y password para saber quien hizo las acciones

	}

	@Test
	void consultarReclamosPorUsuario(){
		// Consultar reclamos ingresados por los usuarios. Se debe poder filtrar por nuevos, cerrados, etc

	}

	// Administrar la información de los edificios, unidades, propietarios e inquilinos. 

	@Test
	void ABMEdificio(){

	}

	@Test
	void ABMUnidad(){

	}

	@Test
	void ABMUsuarios(){
		// Administrar a los usuarios del sistema, creándolos, asignándoles permisos o modificándolos.

	}

}
