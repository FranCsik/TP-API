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
public class PersonaController {
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

    @PostMapping("/personas")
    public PersonaView crearPersona(@RequestBody PersonaCreateView PersonaCreateView) {
		try{
			Persona persona = controlador.agregarPersona(PersonaCreateView.toModel());
			return persona.toView();
		}catch (PersonaException e){
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("/personas")
	private List<PersonaView> getPersonas() {
		List<Persona> personas = controlador.tomarPersonas();
		List<PersonaView> personasView = new ArrayList<PersonaView>();
		for (Persona persona : personas) {
			personasView.add(persona.toView());
		}
		return personasView;
	} 

	@GetMapping("/personas/{documento}")
	public PersonaCreateView getPersona(@PathVariable String documento) {
		try{
			Persona persona = controlador.buscarPersona(documento);
			return persona.toCreateView();
		} catch (PersonaException e) {
			e.printStackTrace();
			return null;
		}
	}

	@DeleteMapping("/personas/{documento}")
	public void borrarPersona(@PathVariable String documento) {
		try{
			Persona persona = controlador.buscarPersona(documento);
			controlador.eliminarPersona(persona);
		} catch (PersonaException e) {
			e.printStackTrace();
		}
		
	}

	//TODO: Chequear si esta bien esto
	@PutMapping("/personas/{documento}")
	public PersonaCreateView modificarPersona(@PathVariable String documento, @RequestBody PersonaUpdateView actualizacion) {
		try{
			Persona persona = controlador.buscarPersona(documento);
			Persona personaActualizada = controlador.modificarPersona(persona, actualizacion);
			return personaActualizada.toCreateView();
		} catch (PersonaException e) {
			e.printStackTrace();
			return null;
		}
	}

}
