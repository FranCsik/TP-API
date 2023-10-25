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
	
	public Persona agregarPersona(Persona persona) throws PersonaException{
		try{
			personaRepository.save(persona);
		}catch (Exception e){
			throw new PersonaException("No se pudo agregar la persona");
		}
		return persona;
	}
	
	public void eliminarPersona(Persona persona) throws PersonaException {
		personaRepository.delete( persona );
	}

	public Persona modificarPersona(Persona persona, PersonaUpdateView actualizacion) throws PersonaException {
		try{
			persona.setNombre(actualizacion.getNombre());
			persona.setMail(actualizacion.getMail());
			persona.setPassword(actualizacion.getContrasenia());
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
	
	public Edificio buscarEdificio(int codigo) throws EdificioException {
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ) {
			return edificio.get();
		}
		return null;
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
			List<Persona> habilitados = edificio.habilitados();
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

	public boolean login(String mail, String password){
		//TODO: Se debe agregar capa de seguridad, y tirar un request con mail y contraseña?

		Optional<Persona> persona = personaRepository.findByMail(mail);
		if (persona.isPresent()){
			if (persona.get().getPassword().equals(password)){
				return true;
			}
		}
		return false;
	}

	public List<Persona> tomarPersonas(){
		return personaRepository.findAll();
	}

	public Edificio agregarEdificio(Edificio edificio){
		edificioRepository.save(edificio);
		return edificio;
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
			Administrador administrador = administradorRepository.findByPersona(persona);
			return administrador;
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
}