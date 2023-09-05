package com.example.demo;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.controller.*;
import com.example.demo.dao.EdificioRepository;
import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.ReclamoRepository;
import com.example.demo.dao.UnidadRepository;
import com.example.demo.model.*;
import com.example.demo.views.*;

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
		

		int reclamo = controlador.agregarReclamo(1, 1, "10", "6", "CI 13230978", "baño", "no funciona la luz");
		

		
		/*for( ReclamoView r: reclamos ) {
			System.out.println( r.getDescripcion() );
		}*/
		
		
		
	}

}
