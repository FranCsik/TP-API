package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.AdministradorRepository;
import com.example.demo.dao.EdificioRepository;
import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.ReclamoRepository;
import com.example.demo.dao.UnidadRepository;
import com.example.demo.exceptions.PersonaException;
import com.example.demo.model.Administrador;
import com.example.demo.model.Persona;
import com.example.demo.views.PersonaView;

@CrossOrigin
@RestController
public class AdministradorController {
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

    @GetMapping("/administradores")
    public List<PersonaView> getAdministradores() {
        List<Administrador> administradores = administradorRepository.findAll();
        List<PersonaView> administradoresView = new ArrayList<PersonaView>();
        for (Administrador administrador : administradores) {
            Persona persona = administrador.getPersona();
            administradoresView.add(persona.toView());
        }
        return administradoresView;   
    }

    @PostMapping("/administradores/{documento}")
    public PersonaView postAdministrador(@PathVariable String documento) {
        try{
            Persona persona = controlador.buscarPersona(documento);
            controlador.agregarAdministrador(persona);
            return persona.toView();
        }catch (PersonaException e){
            e.printStackTrace();
            return null;
        }
    }

    @DeleteMapping("/administradores/{documento}")
    public void deleteAdministrador(@PathVariable String documento) {
        try{
            Persona persona = controlador.buscarPersona(documento);
            Optional<Administrador> administrador = administradorRepository.findByPersona(persona);
            controlador.eliminarAdministrador(administrador.get());
        }catch (PersonaException e){
            e.printStackTrace();
        }
    }

    @GetMapping("/administradores/{documento}")
    public PersonaView getAdministrador(@PathVariable String documento) throws PersonaException {
        
            Persona persona = controlador.buscarPersona(documento);
            Optional<Administrador> administrador = administradorRepository.findByPersona(persona);
            if (!administrador.isPresent()){
                throw new PersonaException("No existe un administrador con ese documento");
            }
            return administrador.get().getPersona().toView();
        
    }

}
