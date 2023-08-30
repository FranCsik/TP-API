package com.example.demo;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.UnidadRepository;
import com.example.demo.model.*;

@SpringBootApplication
public class Application implements CommandLineRunner {
	
	@Autowired
	PersonaRepository personaRepositorio;
	@Autowired
	UnidadRepository unidadRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Hola mundo  ");
		List<Unidad> unidades = unidadRepository.findAll();
		for( Unidad u: unidades ) {
			for (Persona p: u.getDuenios()) {
				System.out.println(p.getDocumento());				
			}
			
		}
	}

}
