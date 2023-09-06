package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.controller.Controlador;
import com.example.demo.dao.EdificioRepository;
import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.ReclamoRepository;
import com.example.demo.dao.UnidadRepository;
import com.example.demo.model.Persona;

@SpringBootApplication
public class Application implements CommandLineRunner {
	

	@Autowired
	Controlador controlador;
	@Autowired
	EdificioRepository edificioRepository;
	@Autowired
	UnidadRepository unidadRepository;
	@Autowired
	PersonaRepository personaRepository;
	@Autowired
	ReclamoRepository reclamoRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
	}

}
