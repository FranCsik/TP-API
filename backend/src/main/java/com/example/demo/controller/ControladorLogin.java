package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.AdministradorRepository;
import com.example.demo.dao.EdificioRepository;
import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.ReclamoRepository;
import com.example.demo.dao.UnidadRepository;

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


    @PostMapping("/login")
    public boolean login(String email, String password) {
        return controlador.login(email, password);
    }

}
