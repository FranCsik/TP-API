package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    @GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/duenios")
    public List<PersonaView> dueniosPorUnidad(@PathVariable int codigo, @PathVariable  String piso, @PathVariable String numero) throws UnidadException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		List<Persona> duenios = unidad.getDuenios();
		for(Persona persona : duenios)
			resultado.add(persona.toView());
		return resultado;
	}

    @GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/inquilinos")
    public List<PersonaView> inquilinosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		List<Persona> inquilinos = unidad.getInquilinos();
		for(Persona persona : inquilinos)
			resultado.add(persona.toView());
		return resultado;
	}

    @PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/transferir")
    public void transferirUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody Persona persona) throws UnidadException, PersonaException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.transferir(persona);
		unidadRepository.save(unidad);
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/agregarDuenio")
	public void agregarDuenioUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody Persona persona) throws UnidadException, PersonaException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.agregarDuenio(persona);
		unidadRepository.save(unidad);
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/alquilar")
	public void alquilarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody Persona persona) throws UnidadException, PersonaException{
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		System.out.println( "Unidad: " + unidad.getId() );
		unidad.alquilar(persona);
		unidadRepository.save(unidad);
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/agregarInquilino")
	public void agregarInquilinoUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody Persona persona) throws UnidadException, PersonaException{
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.agregarInquilino(persona);
		unidadRepository.save(unidad);
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/liberar")
	public void liberarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.liberar();
		unidadRepository.save(unidad);
	}

	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/habitar")
	public void habitarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		unidad.habitar();
		unidadRepository.save(unidad);
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

}