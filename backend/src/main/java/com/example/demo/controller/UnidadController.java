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
public class UnidadController {
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

	@GetMapping("/unidades")
	public List<UnidadView> getUnidades(){
		List<UnidadView> unidadesView = new ArrayList<UnidadView>();
		for(Unidad unidad : controlador.tomarUnidades()) {
			unidadesView.add(unidad.toView());
		}
		return unidadesView;
	}

	@GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}")
	public UnidadView getUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException{
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		if (unidad == null) {
			throw new UnidadException("No se encontro la unidad");
		}
		return unidad.toView();
	}

	// @PostMapping("/unidades")
	// public UnidadView createUnidad(@RequestBody UnidadView unidad) throws UnidadException{
	// 	Unidad unidadModel = Unidad(unidad.getPiso(), unidad.getNumero(), unidad.getEdificio());
	// }
	
    @GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/duenios")
    public List<PersonaView> dueniosPorUnidad(@PathVariable int codigo, @PathVariable  String piso, @PathVariable String numero) throws UnidadException{
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		return controlador.devolverListaPersonasView(unidad.getDuenios());
	}

    @GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/inquilinos")
    public List<PersonaView> inquilinosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException{
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		return controlador.devolverListaPersonasView(unidad.getInquilinos());
	}

    @PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/transferir")	
    public UnidadView transferirUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody List<DocumentoView> personas) throws UnidadException, PersonaException {
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		List<Persona> nuevosDuenios = controlador.buscarPersonas(personas);
		unidad.transferir(nuevosDuenios);
		unidadRepository.save(unidad);
		return unidad.toView();
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/agregarDuenio/{documento}")
	public UnidadView agregarDuenioUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @PathVariable String documento) throws UnidadException, PersonaException {
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		Persona persona = controlador.buscarPersona(documento);
		unidad.agregarDuenio(persona);
		unidadRepository.save(unidad);
		return unidad.toView();
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/alquilar")
	public UnidadView alquilarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody(required = false) List<DocumentoView> documentos) throws UnidadException, PersonaException{
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		List<Persona> personas = new ArrayList<Persona>();
		if (documentos != null){
			personas = controlador.buscarPersonas(documentos);
		}
		unidad.alquilar(personas);
		unidadRepository.save(unidad);
		return unidad.toView();
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/agregarInquilino/{documento}")
	public UnidadView agregarInquilinoUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @PathVariable String documento) throws UnidadException, PersonaException{
		Persona persona = controlador.buscarPersona(documento);
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		unidad.agregarInquilino(persona);
		unidadRepository.save(unidad);
		return unidad.toView();
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/liberar")
	public UnidadView liberarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		unidad.liberar();
		unidadRepository.save(unidad);
		return unidad.toView();
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/habitar")
	public UnidadView habitarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		unidad.habitar();
		unidadRepository.save(unidad);
		return unidad.toView();
	}
}
