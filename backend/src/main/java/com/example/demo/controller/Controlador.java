package com.example.demo.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
		System.out.println(reclamos.size());
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
		}
		
		return resultado;
	}
	
	public List<ReclamoView> reclamosPorUnidad(int codigo, String piso, String numero) {
		Unidad un = unidadRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByUnidad(un);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
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
	
	public List<ReclamoView> reclamosPorPersona(String documento) {
		Persona persona = personaRepository.findById( documento ).get();
		List<Reclamo> reclamos = reclamoRepository.findByUsuario( persona );
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
		}
		return resultado;
	}
 
	public int agregarReclamo(int codigoEdificio, int codigoUnidad, String piso, String numero, String documento, String ubicacion, String descripcion, Estado estado) throws EdificioException, UnidadException, PersonaException {
		Edificio edificio = buscarEdificio(codigoEdificio);
		Unidad unidad = buscarUnidad(codigoUnidad, piso, numero);
		Persona persona = buscarPersona(documento);
		Reclamo reclamo = new Reclamo(persona, edificio, ubicacion, descripcion, unidad, estado);
		return reclamo.getNumero();
	}
	
	public void agregarImagenAReclamo(int numero, String direccion, String tipo) throws ReclamoException {
		Reclamo reclamo = buscarReclamo(numero);
		reclamo.agregarImagen( direccion, tipo );
		reclamoRepository.save( reclamo );
	}
	
	public void cambiarEstado(int numero, Estado estado) throws ReclamoException {
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
	
	private Persona buscarPersona(String documento) throws PersonaException {
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
}