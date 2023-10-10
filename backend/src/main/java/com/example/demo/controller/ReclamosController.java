package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.*;
import com.example.demo.views.*;
import com.example.demo.dao.*;
import com.example.demo.exceptions.*;

@RestController
public class ReclamosController {
	@Autowired
	Controlador controlador;
    @Autowired
	EdificioRepository edificioRepository;
	@Autowired
	PersonaRepository personaRepository;
	@Autowired
	UnidadRepository unidadRepository;
	@Autowired
	ReclamoRepository reclamoRepository;

	@GetMapping("/reclamos")
	public List<ReclamoView> getReclamos(){
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for (Reclamo r: controlador.tomarReclamos()){
			resultado.add(r.toView());
		}
		return resultado;
	}

    @GetMapping("/reclamos/edificio/{codigo}")
    public List<ReclamoView> reclamosPorEdificio(@PathVariable int codigo){
		Edificio ed = edificioRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByEdificio(ed);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
		}
		return resultado;
	}

    @GetMapping("/reclamos/unidad/codigo={codigo}&piso={piso}&numero={numero}")
    public List<ReclamoView> reclamosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) {
		Unidad un = unidadRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByUnidad(un);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView());
		}
		return resultado;
	}

    @GetMapping("/reclamos/{numero}")
    public ReclamoView reclamoPorNumero(@PathVariable int numero) {
		Optional<Reclamo> reclamo = reclamoRepository.findById( numero );
		ReclamoView resultado = null;
		if( reclamo.isPresent() ) {
			resultado = reclamo.get().toView();
		}
		return resultado;
	}


    @GetMapping("/reclamos/persona/{documento}&estado={estado}")
    public List<ReclamoView> reclamosPorPersona(@PathVariable String documento, @PathVariable("estado") Optional<Estado> estado) {
		//TODO: Se debe poder filtrar por nuevos, cerrados, etc
		if (estado.isPresent()){
			Persona persona = personaRepository.findById( documento ).get();
			List<Reclamo> reclamos = reclamoRepository.findByUsuarioAndEstado(persona, estado.get());
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

	/* CHEQUEAR FUNCIONAMIENTO */
	@PostMapping("/reclamos/agregar")
	public int agregarReclamo( @RequestBody Reclamo reclamo ) throws EdificioException, UnidadException, PersonaException {
		// Se debe hacer que el la unidad no exista, en ese caso se debera describir en ubicacion el lugar donde se encuentra el desperfecto
		// Chequear que el reclamo lo haga el usuario valido 
		// En caso de estar alquilada el inquilino puede hacer el reclamo
		// En caso de ser una sala comun lo puede hacer cualquier persona
		// En caso de no estar alquilada el propietario puede hacer el reclamo
		Edificio edificio = reclamo.getEdificio();
		Unidad unidad = reclamo.getUnidad();

		//vemos si el usuario ingreso un edificio y si realmente existe
		if( edificio == null || buscarEdificio( edificio.getCodigo() ) == null ) {
			throw new EdificioException("El edificio no existe");
		} else {
			//Si existe, lo asigamos a la variable edificio
			edificio = buscarEdificio( edificio.getCodigo() );
		}


		//Si el usuario ingreso una unidad, chequeamos que exista
		if( unidad != null){
			if ( unidad.getPiso() != null && unidad.getNumero() != null ) {
				unidad = buscarUnidad( unidad.getId(), unidad.getPiso(), unidad.getNumero() );
				//Si no se encuentra la unidad, tiramos un error
				if( unidad == null ) {
					throw new UnidadException("La unidad no existe");
				}
			}else{
				throw new UnidadException("Faltan ingresar datos de la unidad");
			}

		}
		try{
			validarPersonaCorrecta(unidad, reclamo.getUsuario().getDocumento(), reclamo.getUbicacion(), edificio);
		}catch (PersonaException e){
			throw new PersonaException("La persona no tiene permisos para hacer el reclamo");
		}

		reclamoRepository.save(reclamo);
		return reclamo.getNumero();

	}

	@PostMapping("/reclamos/{numero}/agregarImagen")
	public void agregarImagenAReclamo(@PathVariable int numero, @RequestBody Imagen imagen) throws ReclamoException {
		Reclamo reclamo = buscarReclamo(numero);
		reclamo.agregarImagen( imagen.getDireccion(), imagen.getTipo() );
		reclamoRepository.save( reclamo );
	}

	//CHEQUEAR ESTE METODO
	@PostMapping("/reclamos/{numero}/cambiarEstado")
	public void cambiarEstado(@PathVariable int numero, @RequestBody Estado estado) throws ReclamoException {
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

	private Reclamo buscarReclamo(int numero) throws ReclamoException {
		Optional<Reclamo> r = reclamoRepository.findById(numero);
		if( r.isPresent() ) {
			return r.get();
		} else {
			return null;
		}
	}
    
}
