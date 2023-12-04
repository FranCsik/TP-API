package com.example.demo.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

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
	@Autowired
	AdministradorRepository administradorRepository;
	@Autowired
	ImagenRepository imagenRepository;

	
	public List<Edificio> getEdificios(){
		return edificioRepository.findAll();
	}
	
	public List<Unidad> getUnidadesPorEdificio(Edificio edificio) throws EdificioException{
		return edificio.getUnidades();
	}
	
	public List<Persona> habilitadosPorEdificio(Edificio edificio) throws EdificioException{
		return edificio.habilitados();
	}


	public List<Persona> dueniosPorEdificio(Edificio edificio) throws EdificioException{
		return edificio.duenios();			
	}

	public List<Persona> habitantesPorEdificio(Edificio edificio) throws EdificioException{
		return edificio.habitantes();	
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
	
	public Unidad transferirUnidad(Unidad unidad, List<Persona> nuevosDuenios) throws UnidadException, PersonaException {
		unidad.transferir(nuevosDuenios);
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad agregarUnidad(Unidad unidad) throws UnidadException{
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad agregarDuenioUnidad(Unidad unidad, Persona persona) throws UnidadException, PersonaException {
		unidad.agregarDuenio(persona);
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad alquilarUnidad(Unidad unidad, List<DocumentoView> documentos) throws UnidadException, PersonaException{
		List<Persona> personas = new ArrayList<Persona>();
		if (documentos != null){
			personas = buscarPersonas(documentos);
		}
		unidad.alquilar(personas);
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad agregarInquilinoUnidad(Unidad unidad, Persona inquilino) throws UnidadException, PersonaException{
		unidad.agregarInquilino(inquilino);
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad deshabitarUnidad(Unidad unidad) throws UnidadException {
		unidad.deshabitar();
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad liberarUnidad(Unidad unidad) throws UnidadException {
		unidad.liberar();
		unidadRepository.save(unidad);
		return unidad;
	}
	
	public Unidad habitarUnidad(Unidad unidad) throws UnidadException {
		unidad.habitar();
		unidadRepository.save(unidad);
		return unidad;
	}
	
	public Persona agregarPersona(Persona persona){
		personaRepository.save(persona);
		return persona;
	}
	
	public void eliminarPersona(Persona persona){
		personaRepository.delete( persona );
	}

	public Persona modificarPersona(Persona persona, PersonaUpdateView actualizacion) throws PersonaException {
		try{
			persona.setNombre(actualizacion.getNombre());
			persona.setMail(actualizacion.getMail());
			persona.setPassword(actualizacion.getPassword());
			personaRepository.save(persona);
		}catch (Exception e){
			throw new PersonaException("No se pudo actualizar la persona");
		}
		return persona;
	}
	
	public List<Reclamo> reclamosPorEdificio(Edificio edificio){
		return reclamoRepository.findByEdificio(edificio);
	}
	
	public List<Reclamo> reclamosPorUnidad(Unidad unidad) {
		return reclamoRepository.findByUnidad(unidad);
	}

	public List<ReclamoView> devolverListaReclamosView(List<Reclamo> reclamos){
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for(Reclamo reclamo : reclamos)
			resultado.add(reclamo.toView());
		return resultado;
	}

	public Unidad modificarUnidad(Unidad unidad, UnidadInputView actualizacion) throws UnidadException, EdificioException {
		unidad.setPiso(actualizacion.getPiso());
		unidad.setNumero(actualizacion.getNumero());
		unidad.setEdificio(buscarEdificio(actualizacion.getCodigoEdificio()));
		unidadRepository.save(unidad);
		return unidad;
	}
	
	public List<Reclamo> reclamosPorPersonaYEstado(Persona persona, Estado estado) {
		//TODO: Se debe poder filtrar por nuevos, cerrados, etc
		return reclamoRepository.findByUsuarioAndEstado(persona, estado);
	}

	public List<Reclamo> reclamosPorPersona(Persona persona){
		return reclamoRepository.findByUsuario(persona);
	}
 
	public Reclamo agregarReclamo(Edificio edificio, Persona persona, String ubicacion, String descripcion, Estado estado, Unidad unidad) throws EdificioException, UnidadException, PersonaException {
		// Se debe hacer que el la unidad no exista, en ese caso se debera describir en ubicacion el lugar donde se encuentra el desperfecto
		// Chequear que el reclamo lo haga el usuario valido 
		// En caso de estar alquilada el inquilino puede hacer el reclamo
		// En caso de ser una sala comun lo puede hacer cualquier persona
		// En caso de no estar alquilada el propietario puede hacer el reclamo
		validarPersonaCorrecta(unidad, persona, ubicacion, edificio);
		Reclamo reclamo = reclamoRepository.save(new Reclamo(persona, edificio, ubicacion, descripcion, unidad, estado));
		return reclamo;
	}
	
	public Reclamo agregarImagenAReclamo(Reclamo reclamo, Imagen imagen) throws ReclamoException {
		reclamo.agregarImagen( imagen );
		Reclamo nuevoReclamo = reclamoRepository.save( reclamo );
		return nuevoReclamo;
	}
	
	public void cambiarEstado(int numero, Estado estado) throws ReclamoException {
		//TODO: Dice anotar medidas tomadas, donde deberia de anotarse?
		Reclamo reclamo = buscarReclamo(numero);
		reclamo.cambiarEstado(estado);
		reclamoRepository.save( reclamo );
	}
	
	public Edificio buscarEdificio(int codigo) throws EdificioException {
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ) {
			return edificio.get();
		}
		throw new EdificioException("El edificio no existe");
	}

	public Unidad buscarUnidad(int codigo, String piso, String numero) throws UnidadException{
		Edificio edificio = null;
		Optional<Edificio> edificioOptional = edificioRepository.findById( codigo );
		if( edificioOptional.isPresent() ) {
			edificio = edificioOptional.get();
		} else {
			throw new UnidadException("El edificio no existe");
		}
		Optional<Unidad> u = unidadRepository.findByEdificioAndPisoAndNumero(edificio, piso, numero);
		if (u.isPresent() ){
			return u.get();
		} else {
			throw new UnidadException("La unidad no existe");
		}
	}	
	
	public Persona buscarPersona(String documento) throws PersonaException {
		Optional<Persona> p = personaRepository.findById( documento );
		if (p.isPresent() ){
			return p.get();
		}
		throw new PersonaException("La persona no existe");
	}
	
	public Reclamo buscarReclamo(int numero) throws ReclamoException {
		Optional<Reclamo> r = reclamoRepository.findById(numero);
		if( r.isPresent() ) {
			return r.get();
		}
		throw new ReclamoException("El reclamo no existe");
	}

	public void validarPersonaCorrecta(Unidad unidad, Persona persona, String ubicacion, Edificio edificio) throws PersonaException{
		if (unidad == null){
			List<Persona> habilitados = edificio.habilitados();
			for (Persona habilitado : habilitados) {
				if (habilitado.getDocumento().equals(persona.getDocumento())) {
					return;
				}
			}
		}else{
			for (Persona habilitado:unidad.habilitados()) {
				if (habilitado.getDocumento().equals(persona.getDocumento())) {
					return;
				}
			}
		}
		throw new PersonaException("La persona no tiene permisos para hacer el reclamo");
	}

	public Reclamo cambiarEstado(Reclamo reclamo, Estado estado){
		reclamo.cambiarEstado(estado);
		Reclamo reclamoNuevo = reclamoRepository.save( reclamo );
		return reclamoNuevo;
	}

	public Persona login(String documento, String password) throws Exception{
		//TODO: Se debe agregar capa de seguridad, y tirar un request con mail y contraseña?

		Optional<Persona> persona = personaRepository.findById(documento);
		if (persona.isPresent()){
			Persona p = persona.get();
			if (p.getPassword().equals(password)){
				return persona.get();
			}
		}
		throw new Exception("Las credenciales son invalidas");
	}

	public void eliminarReclamo(Reclamo reclamo){
		reclamoRepository.delete(reclamo);

	}

	public Imagen buscarImagen(int numero) throws ImagenException{
		Optional<Imagen> imagen = imagenRepository.findById(numero);
		if (imagen.isPresent()){
			return imagen.get();
		}
		throw new ImagenException("La imagen no existe");

	}

	public Reclamo eliminarImagenDeReclamo(Reclamo reclamo, Imagen imagen){
		reclamo.eliminarImagen(imagen);
		return reclamoRepository.save(reclamo);
	}

	public Reclamo actualizarReclamo(Reclamo reclamo, ReclamoActualizarView actualizacion){
		String nuevaDescripcion = reclamo.getDescripcion() + " - " + actualizacion.getDescripcion();
		reclamo.setDescripcion(nuevaDescripcion);
		reclamo.setEstado(actualizacion.getEstado());
		Reclamo reclamoNuevo = reclamoRepository.save( reclamo );
		return reclamoNuevo;
	}

	public List<Persona> tomarPersonas(){
		return personaRepository.findAll();
	}

	public Edificio agregarEdificio(Edificio edificio){
		edificioRepository.save(edificio);
		return edificio;
	}

	public List<Reclamo> reclamosPorUnidadYEstado(Unidad unidad, Estado estado){
		return reclamoRepository.findByUnidadAndEstado(unidad,estado);
	}

	public List<Reclamo> tomarReclamosPorEstado(Estado estado){
		return reclamoRepository.findByEstado(estado);
	}

	public List<Reclamo> reclamosPorEdificioYEstado(Edificio edificio, Estado estado){
		return reclamoRepository.findByEdificioAndEstado(edificio, estado);
	}

	public void eliminarEdificio(Edificio edificio){
		edificioRepository.delete( edificio );
	}

	public List<Unidad> tomarUnidades(){
		return unidadRepository.findAll();
	}

	public List<Reclamo> tomarReclamos(){
		return reclamoRepository.findAll();
	}

	public Edificio modificarEdificio(Edificio edificio, EdificioView actualizacion) throws EdificioException {
		try{
			edificio.setNombre(actualizacion.getNombre());
			edificio.setDireccion(actualizacion.getDireccion());
			edificioRepository.save(edificio);
		}catch (Exception e){
			throw new EdificioException("No se pudo actualizar el edificio");
		}
		return edificio;
	}

	public Administrador agregarAdministrador(Persona persona){
		Administrador administrador = new Administrador(persona);
		administradorRepository.save(administrador);
		return administrador;
	}

	public void eliminarAdministrador(Administrador administrador){
		administradorRepository.delete( administrador );
	}

	public Administrador buscarAdministrador(String documento){
		try{
			Persona persona = buscarPersona(documento);
			Optional<Administrador> administrador = administradorRepository.findByPersona(persona);
			return administrador.get();
		}catch (Exception e){

		}
		return null;
	}

	public List<Administrador> tomarAdministradores(){
		return administradorRepository.findAll();
	}

	public List<PersonaView> devolverListaPersonasView(List<Persona> personas){
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		for(Persona persona : personas)
			resultado.add(persona.toView());
		return resultado;
	}

	public List<Persona> buscarPersonas(List<DocumentoView> documentos) throws PersonaException{
		List<Persona> resultado = new ArrayList<Persona>();
		for(DocumentoView documento : documentos){
			Persona persona = buscarPersona(documento.getDocumento());
			if (persona == null){
				throw new PersonaException("No se encontro la persona");
			}
			resultado.add(persona);
		}
		return resultado;
	}

	public void eliminarUnidad(Unidad unidad){
		unidadRepository.delete( unidad );
	}

	public Unidad eliminarInquilinoUnidad(Unidad unidad, Persona inquilino) throws UnidadException, PersonaException {
		unidad.eliminarInquilino(inquilino);
		unidadRepository.save(unidad);
		return unidad;
	}

	public Unidad eliminarDuenioUnidad(Unidad unidad, Persona duenio) throws UnidadException, PersonaException {
		unidad.eliminarDuenio(duenio);
		unidadRepository.save(unidad);
		return unidad;
	}

	public List<Edificio> edificiosPorPersona(Persona persona) throws PersonaException{
		List<Edificio> resultado = new ArrayList<Edificio>();
		List<Edificio> edificios = edificioRepository.findAll();
		for(Edificio edificio : edificios){
			if (edificio.habilitados().contains(persona)){
				resultado.add(edificio);
			}
		}
		return resultado;
	}

	public List<EdificioView> devolverListaEdificiosView(List<Edificio> edificios){
		List<EdificioView> resultado = new ArrayList<EdificioView>();
		for(Edificio edificio : edificios)
			resultado.add(edificio.toView());
		return resultado;
	}

	public List<Reclamo> misReclamos(Edificio edificio, Persona persona, Estado estado){

		List<Unidad> unidades = misUnidadesEnEdificio(edificio,persona);
		List<Reclamo> resultado = new ArrayList<Reclamo>();
		List<Reclamo> reclamos = null;
		if (estado != null){
			reclamos = reclamoRepository.findByEdificioAndEstado(edificio, estado);
		}else{
			reclamos = reclamoRepository.findByEdificio(edificio);
		}
		for(Reclamo reclamo : reclamos){
			if (unidades.contains(reclamo.getUnidad())){
				resultado.add(reclamo);
			}
			if (reclamo.getUnidad() == null){
				resultado.add(reclamo);
			}
		}
		return resultado;
	}

	public List<Unidad> misUnidadesEnEdificio(Edificio edificio, Persona persona){
		List<Unidad> resultado = new ArrayList<Unidad>();
		List<Unidad> unidades = edificio.getUnidades();
		for(Unidad unidad : unidades){
			if (unidad.habilitados().contains(persona)){
				resultado.add(unidad);
			}
		}
		return resultado;
	}

	public boolean esAdministrador(Persona persona) throws Exception{
		Optional<Administrador> administrador = administradorRepository.findByPersona(persona);
		if (administrador.isPresent()){
			return true;
		}
		return false;
	}

	public Reclamo agregarImagenesAReclamo(Reclamo reclamo, List<Imagen> imagenes) throws ReclamoException {
		reclamo.agregarImagenes( imagenes );
		Reclamo nuevoReclamo = reclamoRepository.save( reclamo );
		return nuevoReclamo;
	}

	public Persona loginAdmin(String documento, String password) throws Exception{
		Persona persona = login(documento, password);
		if (esAdministrador(persona)){
			return persona;
		}
		throw new Exception("Las credenciales son invalidas");
	}
}