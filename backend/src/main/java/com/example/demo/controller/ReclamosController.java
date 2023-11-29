package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

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
	public List<ReclamoView> getReclamos(@RequestParam(required = false) Estado estado){
		if (estado != null){
			return controlador.devolverListaReclamosView(controlador.tomarReclamosPorEstado(estado));
		}
		return controlador.devolverListaReclamosView(controlador.tomarReclamos());
	}

    @GetMapping("/reclamos/edificio/{codigo}")
    public List<ReclamoView> reclamosPorEdificio(@PathVariable int codigo,@RequestParam(required = false) Estado  estado) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		if (estado != null){
			return controlador.devolverListaReclamosView(controlador.reclamosPorEdificioYEstado(edificio, estado));
		}
		return controlador.devolverListaReclamosView(controlador.reclamosPorEdificio(edificio));
	}

    @GetMapping("/reclamos/unidad/codigo={codigo}&piso={piso}&numero={numero}")
    public List<ReclamoView> reclamosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestParam(required = false) Estado estado) throws UnidadException {
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		if (estado != null){
			return controlador.devolverListaReclamosView(controlador.reclamosPorUnidadYEstado(unidad, estado));
		}
		return controlador.devolverListaReclamosView(controlador.reclamosPorUnidad(unidad));
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
	public List<ReclamoView> reclamosPorPersona(@PathVariable String documento, @RequestParam(required = false) Estado estado) throws PersonaException{
		Persona persona = controlador.buscarPersona(documento);
		if (estado != null){
			return controlador.devolverListaReclamosView(controlador.reclamosPorPersonaYEstado(persona, estado));
		}
		return controlador.devolverListaReclamosView(controlador.reclamosPorPersona(persona));
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
	public ReclamoView agregarImagenAReclamo(@PathVariable int numero, @RequestBody ImagenInputView imagen) throws ReclamoException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		Imagen imagenModel = new Imagen(imagen.getDireccion(), imagen.getTipo());
		Reclamo nuevoReclamo = controlador.agregarImagenAReclamo(reclamo, imagenModel);
		return nuevoReclamo.toView();
	}

	@PostMapping("/reclamos/{numero}/agregarImagenes")
	public ReclamoView agregarImagenesAReclamo(@PathVariable int numero, @RequestBody List<ImagenInputView> imagenes) throws ReclamoException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		List<Imagen> imagenesModel = new ArrayList<Imagen>();
		for (ImagenInputView imagenView : imagenes) {
			Imagen imagen = new Imagen(imagenView.getDireccion(), imagenView.getTipo());
			imagenesModel.add(imagen);
		}
		Reclamo nuevoReclamo = controlador.agregarImagenesAReclamo(reclamo, imagenesModel);
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

	@DeleteMapping("/reclamos/{numero}")
	public void eliminarReclamo(@PathVariable int numero) throws ReclamoException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		controlador.eliminarReclamo(reclamo);
	}

	@DeleteMapping("/reclamos/{numero}/eliminarImagen/{numeroImagen}")
	public ReclamoView eliminarImagenDeReclamo(@PathVariable int numero, @PathVariable int numeroImagen) throws ReclamoException, ImagenException {
		Reclamo reclamo = controlador.buscarReclamo(numero);
		Imagen imagen = controlador.buscarImagen(numeroImagen);
		Reclamo nuevoReclamo = controlador.eliminarImagenDeReclamo(reclamo, imagen);
		return nuevoReclamo.toView();
	}
}
