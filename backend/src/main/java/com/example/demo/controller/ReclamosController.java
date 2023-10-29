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
	@Autowired
	AdministradorRepository administradorRepository;

	//TODO: Se debe agregar filtro por estado
	@GetMapping("/reclamos")
	public List<ReclamoView> getReclamos(){
		return controlador.devolverListaReclamosView(controlador.tomarReclamos());
	}

    @GetMapping("/reclamos/edificio/{codigo}")
    public List<ReclamoView> reclamosPorEdificio(@PathVariable int codigo) throws EdificioException{
		return controlador.devolverListaReclamosView(controlador.reclamosPorEdificio(controlador.buscarEdificio(codigo)));
	}

    @GetMapping("/reclamos/unidad/codigo={codigo}&piso={piso}&numero={numero}")
    public List<ReclamoView> reclamosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		return controlador.devolverListaReclamosView(controlador.reclamosPorUnidad(controlador.buscarUnidad(codigo, piso, numero)));
	}

    @GetMapping("/reclamos/{numero}")
    public ReclamoView reclamoPorNumero(@PathVariable int numero) throws ReclamoException {
		return controlador.buscarReclamo(numero).toView();
	}

    // @GetMapping("/reclamos/persona/{documento}&estado={estado}")
    // public List<ReclamoView> reclamosPorPersona(@PathVariable String documento, @PathVariable("estado") Optional<Estado> estado) {
	// 	//TODO: Se debe poder filtrar por nuevos, cerrados, etc
	// 	if (estado.isPresent()){
	// 		Persona persona = personaRepository.findById( documento ).get();
	// 		List<Reclamo> reclamos = reclamoRepository.findByUsuarioAndEstado(persona, estado.get());
	// 		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
	// 		for( Reclamo r: reclamos ) {
	// 			resultado.add( r.toView() );
	// 		}
	// 		return resultado;
	// 	}else{
	// 		Persona persona = personaRepository.findById( documento ).get();
	// 		List<Reclamo> reclamos = reclamoRepository.findByUsuario( persona );
	// 		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
	// 		for( Reclamo r: reclamos ) {
	// 			resultado.add( r.toView() );
	// 		}
	// 		return resultado;
	// 	}
	// }

	@GetMapping("/reclamos/persona/{documento}")
	public List<ReclamoView> reclamosPorPersona(@PathVariable String documento) throws PersonaException{
		return controlador.devolverListaReclamosView(controlador.reclamosPorPersona(controlador.buscarPersona(documento)));
	}

	@PostMapping("/reclamos")
	public ReclamoView agregarReclamo( @RequestBody ReclamoInputView reclamo ) throws EdificioException, UnidadException, PersonaException {
		Edificio edificio = controlador.buscarEdificio(reclamo.getCodigoEdificio());
		Persona persona = controlador.buscarPersona(reclamo.getdocumento());
		Unidad unidad = null;
		if (reclamo.getunidad() != null){
			unidad = controlador.buscarUnidad(reclamo.getunidad().getCodigoEdificio(), reclamo.getunidad().getPiso(), reclamo.getunidad().getNumero());
		}
		Reclamo reclamoCreado = controlador.agregarReclamo(edificio, persona, reclamo.getUbicacion(), reclamo.getDescripcion(), Estado.nuevo, unidad);
		return reclamoCreado.toView();
	}

	@PostMapping("/reclamos/{numero}/agregarImagen")
	public ReclamoView agregarImagenAReclamo(@PathVariable int numero, @RequestBody Imagen imagen) throws ReclamoException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		Reclamo nuevoReclamo = controlador.agregarImagenAReclamo(reclamo, imagen);
		return nuevoReclamo.toView();
	}

	@PutMapping("/reclamos/{numero}/cambiarEstado")
	public ReclamoView cambiarEstado(@PathVariable int numero, @RequestBody Estado estado) throws ReclamoException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		Reclamo reclamoNuevo = controlador.cambiarEstado(reclamo, estado);
		return reclamoNuevo.toView();
	}

	@PutMapping("/reclamos/{numero}")
	public ReclamoView actualizar(@PathVariable int numero, @RequestBody ReclamoActualizarView actualizacion) throws ReclamoException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		Reclamo reclamoNuevo = controlador.actualizarReclamo(reclamo, actualizacion);
		return reclamoNuevo.toView();
	}
}
