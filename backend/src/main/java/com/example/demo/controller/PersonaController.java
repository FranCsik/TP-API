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
public class PersonaController {
    @Autowired
	EdificioRepository edificioRepository;
	@Autowired
	PersonaRepository personaRepository;
	@Autowired
	UnidadRepository unidadRepository;
	@Autowired
	ReclamoRepository reclamoRepository;

    @PostMapping("/personas/crear")
    public void crearPersona(@RequestBody Persona persona) {
		personaRepository.save(persona);
	}

	@PostMapping("/personas/borrar")
	public void borrarPersona(@RequestBody Persona persona) {
		personaRepository.delete(persona);
	}

	//Este metodo sirve para cambiar los datos y la contrasenia de una persona
	//NO FUNCIONA CORRECTAMENTE
	@PostMapping("/personas/modificar")
	public void modificarPersona(@RequestBody Persona persona) {
		personaRepository.save(persona);
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
