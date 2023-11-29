package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.AdministradorRepository;
import com.example.demo.dao.EdificioRepository;
import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.ReclamoRepository;
import com.example.demo.dao.UnidadRepository;
import com.example.demo.model.Persona;
import com.example.demo.views.LoginView;
import com.example.demo.views.PersonaView;

// @CrossOrigin(origins = "*")
@RestController
public class ControladorLogin {
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

    @CrossOrigin
    @PostMapping("/login")
    public PersonaView login(@RequestBody LoginView loginView) throws Exception {
        return controlador.login(loginView.getdocumento(), loginView.getPassword());
    }

}
