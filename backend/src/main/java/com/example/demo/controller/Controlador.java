package com.example.demo.controller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.*;
import com.example.demo.views.*;
import com.example.demo.dao.*;
import com.example.demo.exceptions.*;



@Controller
public class Controlador {
	
	@Autowired
	EdificioRepository edificioRepository;
	@Autowired
	PersonaRepository personaRepository;
	@Autowired
	UnidadRepository unidadRepository;
	@Autowired
	ReclamoRepository reclamoRepository;

	
	public List<EdificioView> getEdificios(){
		List<Edificio> edificios = edificioRepository.findAll();
		List<EdificioView> views = new ArrayList<EdificioView>();
		for(Edificio e: edificios) {
			views.add( e.toView() );
		}
		return views;
	}
	
	
	public List<UnidadView> getUnidadesPorEdificio(int codigo) throws EdificioException{
		List<UnidadView> resultado = new ArrayList<UnidadView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ) {
			List<Unidad> unidades = edificio.get().getUnidades();
			for(Unidad unidad : unidades)
				resultado.add(unidad.toView());
		}
		return resultado;
	}
	
	public List<PersonaView> habilitadosPorEdificio(int codigo) throws EdificioException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ) {
			Set<Persona> habilitados = edificio.get().habilitados();
			for(Persona persona : habilitados)
				resultado.add(persona.toView());			
		}
		return resultado;
	}


	public List<PersonaView> dueniosPorEdificio(int codigo) throws EdificioException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ){
			for(Persona persona : edificio.get().duenios()) {
				resultado.add(persona.toView());					
			}

		}
		return resultado;			
	}

	public List<PersonaView> habitantesPorEdificio(int codigo) throws EdificioException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ){
			for(Persona persona : edificio.get().habitantes()) {
				resultado.add(persona.toView());					
			}

		}
		return resultado;	
	}

	
	public List<PersonaView> dueniosPorUnidad(int codigo, String piso, String numero) throws UnidadException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		List<Persona> duenios = unidad.getDuenios();
		for(Persona persona : duenios)
			resultado.add(persona.toView());
		return resultado;
	}

	public List<PersonaView> inquilinosPorUnidad(int codigo, String piso, String numero) throws UnidadException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		List<Persona> inquilinos = unidad.getInquilinos();
		for(Persona persona : inquilinos)
			resultado.add(persona.toView());
		return resultado;
	}
	
	public void transferirUnidad(int codigo, String piso, String numero, String documento) throws UnidadException, PersonaException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		Persona persona = buscarPersona(documento);
		unidad.transferir(persona);
		unidadRepository.save(unidad);
		
	}

	public void agregarDuenioUnidad(int codigo, String piso, String numero, String documento) throws UnidadException, PersonaException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		Persona persona = buscarPersona(documento);
		unidad.agregarDuenio(persona);
		unidadRepository.save(unidad);
	}

	public void alquilarUnidad(int codigo, String piso, String numero, String documento) throws UnidadException, PersonaException{
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		System.out.println( "Unidad: " + unidad.getId() );
		Persona persona = buscarPersona(documento);
		unidad.alquilar(persona);
		unidadRepository.save(unidad);
	}

	public void agregarInquilinoUnidad(int codigo, String piso, String numero, String documento) throws UnidadException, PersonaException{
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		Persona persona = buscarPersona(documento);
		unidad.agregarInquilino(persona);
		unidadRepository.save(unidad);
	}

	public void liberarUnidad(int codigo, String piso, String numero) throws UnidadException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.liberar();
		unidadRepository.save(unidad);
	}
	
	public void habitarUnidad(int codigo, String piso, String numero) throws UnidadException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.habitar();
		unidadRepository.save(unidad);
	}
	
	public void agregarPersona(String documento, String nombre) {
		Persona persona = new Persona();
		persona.setDocumento(documento);
		persona.setNombre(nombre);
		personaRepository.save(persona);
	}
	
	public void eliminarPersona(String documento) throws PersonaException {
		Persona persona = buscarPersona(documento);
		personaRepository.delete( persona );
	}
	
	public List<ReclamoView> reclamosPorEdificio(int codigo){
		Edificio ed = edificioRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByEdificio(ed);
		// System.out.println(reclamos.size());
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
		}
		return resultado;
	}
	
	public List<ReclamoView> reclamosPorUnidad(int codigo, String piso, String numero) {
		//TODO: Esto debe buscar por codigo de edificio, piso y numero de unidad
		Unidad un = unidadRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByUnidad(un);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView());
		}
		return resultado;
	}
	
	public ReclamoView reclamoPorNumero(int numero) {
		Optional<Reclamo> reclamo = reclamoRepository.findById( numero );
		ReclamoView resultado = null;
		if( reclamo.isPresent() ) {
			resultado = reclamo.get().toView();
		}
		return resultado;
	}
	
	public List<ReclamoView> reclamosPorPersona(String documento, Estado estado) {
		//TODO: Se debe poder filtrar por nuevos, cerrados, etc
		if (estado != null){
			Persona persona = personaRepository.findById( documento ).get();
			List<Reclamo> reclamos = reclamoRepository.findByUsuarioAndEstado(persona, estado);
			List<ReclamoView> resultado = new ArrayList<ReclamoView>();
			for( Reclamo r: reclamos ) {
				resultado.add( r.toView() );
			}
			return resultado;
		}else{
			Persona persona = personaRepository.findById( documento ).get();
			List<Reclamo> reclamos = reclamoRepository.findByUsuario( persona );
			List<ReclamoView> resultado = new ArrayList<ReclamoView>();
			for( Reclamo r: reclamos ) {
				resultado.add( r.toView() );
			}
			return resultado;
		}
	}
 
	public int agregarReclamo(int codigoEdificio, Integer codigoUnidad, String piso, String numero, String documento, String ubicacion, String descripcion, Estado estado) throws EdificioException, UnidadException, PersonaException {
		// Se debe hacer que el la unidad no exista, en ese caso se debera describir en ubicacion el lugar donde se encuentra el desperfecto
		// Chequear que el reclamo lo haga el usuario valido 
		// En caso de estar alquilada el inquilino puede hacer el reclamo
		// En caso de ser una sala comun lo puede hacer cualquier persona
		// En caso de no estar alquilada el propietario puede hacer el reclamo
		Edificio edificio = null;
		Unidad unidad = null;
		try{
			edificio = buscarEdificio(codigoEdificio);
		}catch (EdificioException e){
			throw new EdificioException("El edificio no existe");
		}
		if ( codigoUnidad != null && piso != null && numero != null ) {
			try{
				unidad = buscarUnidad(codigoUnidad, piso, numero);
			}catch (UnidadException e){
				throw new UnidadException("La unidad no existe");
			}
		}
		try{
			validarPersonaCorrecta(unidad, documento, ubicacion, edificio);
		}catch (PersonaException e){
			throw new PersonaException("La persona no tiene permisos para hacer el reclamo");
		}
		Persona persona = buscarPersona(documento);
		Reclamo reclamo = new Reclamo(persona, edificio, ubicacion, descripcion, unidad, estado);
		reclamoRepository.save(reclamo);
		return reclamo.getNumero();
	}
	
	public void agregarImagenAReclamo(int numero, String direccion, String tipo) throws ReclamoException {
		Reclamo reclamo = buscarReclamo(numero);
		reclamo.agregarImagen( direccion, tipo );
		reclamoRepository.save( reclamo );
	}
	
	public void cambiarEstado(int numero, Estado estado) throws ReclamoException {
		//TODO: Dice anotar medidas tomadas, donde deberia de anotarse?
		Reclamo reclamo = buscarReclamo(numero);
		reclamo.cambiarEstado(estado);
		reclamoRepository.save( reclamo );
	}
	
	private Edificio buscarEdificio(int codigo) throws EdificioException {
		Optional<Edificio> oEdificio = edificioRepository.findById( codigo );
		if( oEdificio.isPresent() ) {
			return oEdificio.get();
		}
		return null;
	}

	private Unidad buscarUnidad(int codigo, String piso, String numero) throws UnidadException{
		Optional<Unidad> u = unidadRepository.findByIdAndPisoAndNumero(codigo, piso, numero);
		if (u.isPresent() ){
			return u.get();
		} else {
			return null;
		}
	}	
	
	public Persona buscarPersona(String documento) throws PersonaException {
		Optional<Persona> p = personaRepository.findById( documento );
		if (p.isPresent() ){
			return p.get();
		} else {
			return null;
		}
	}
	
	private Reclamo buscarReclamo(int numero) throws ReclamoException {
		Optional<Reclamo> r = reclamoRepository.findById(numero);
		if( r.isPresent() ) {
			return r.get();
		} else {
			return null;
		}
	}

	private void validarPersonaCorrecta(Unidad unidad, String documento, String ubicacion, Edificio edificio) throws PersonaException{
		if (unidad == null){
			Set<Persona> habilitados = edificio.habilitados();
			for (Persona habilitado : habilitados) {
				if (habilitado.getDocumento().equals(documento)) {
					return;
				}
			}
		}else{
			if (unidad.getInquilinos().size() > 0){
				for (Persona inquilino : unidad.getInquilinos()) {
					if (inquilino.getDocumento().equals(documento)) {
						return;
					}
			}
			}else{
				for (Persona duenio : unidad.getDuenios()) {
					if (duenio.getDocumento().equals(documento)) {
						return;
					}
				}
			}
		}
		throw new PersonaException("La persona no tiene permisos para hacer el reclamo");
	}

	private boolean login(String mail, String password){
		//TODO: Se debe agregar capa de seguridad, y tirar un request con mail y contraseña?

		Optional<Persona> persona = personaRepository.findByMail(mail);
		if (persona.isPresent()){
			if (persona.get().getPassword().equals(password)){
				return true;
			}
		}
		return false;
	}

	//Sobre el manejo de imagenes

	//Hay que tener una carpeta llamada "imagenes" en el escritorio, cuando se quiera agregar una imagen
	//a un reclamo, se va a crear una carpeta con el nombre del id del reclamo, y ahí se van a 
	//ir guardardando las imagenes correspondientes a cierto reclamo.
	public String guardarImagen(int reclamoId, MultipartFile file) throws Exception {
	    // Verificar si el reclamo existe
	    Reclamo reclamo = buscarReclamo(reclamoId);
	    if (reclamo == null) {
	        System.out.println("No se encontró el reclamo con ID: " + reclamoId);
	        // Puedes lanzar una excepción aquí si lo consideras necesario
	        throw new Exception("No se encontró el reclamo con ID: " + reclamoId);
	    }

	    try {
	    	// Obtener nombre de archivo, tipo y construir la ruta con carpeta del reclamo
	        String nombreArchivo = obtenerNombreDeArchivo(file);
	        String carpetaReclamo = "C:/Users/Usuario/Desktop/imagenes/" + reclamoId + "/";
	        String imagePath = carpetaReclamo + nombreArchivo;
	        String tipo = obtenerTipoDeImagen(file);

	        // Crear la carpeta del reclamo si no existe
	        File carpetaReclamoFile = new File(carpetaReclamo);
	        if (!carpetaReclamoFile.exists()) {
	            carpetaReclamoFile.mkdirs();
	        }

	        // Guardar la imagen en disco
	        try (FileOutputStream fos = new FileOutputStream(imagePath)) {
	            fos.write(file.getBytes());
	        }

	        // Actualizar la entidad Reclamo con la nueva ruta
	        Imagen imagen = new Imagen(imagePath, tipo);
	        reclamo.setImagen(imagen); // Asumiendo que Reclamo tiene un método para agregar imágenes
	        reclamoRepository.save(reclamo);

	        return imagePath;
	    } catch (IOException e) {
	        System.out.println("Error al guardar la imagen: " + e.getMessage());
	        throw new ReclamoException("Error al guardar la imagen", e);
	    }
	}
	
	public String obtenerNombreDeArchivo(MultipartFile file) {
        // Obtener el nombre original del archivo
        return file.getOriginalFilename();
    }
	
	public String obtenerTipoDeImagen(MultipartFile imagen) {
        // Obtener el nombre original del archivo
        String nombreOriginal = imagen.getOriginalFilename();

        // Verificar si el nombre original no es nulo y tiene una extensión
        if (nombreOriginal != null && nombreOriginal.contains(".")) {
            // Obtener la extensión del archivo
            String tipo = nombreOriginal.substring(nombreOriginal.lastIndexOf('.') + 1).toLowerCase();
            return tipo;
        } else {
            // No se encontró una extensión válida
            return "Desconocido";
        }
    }
}