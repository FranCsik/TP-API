package com.example.demo;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.controller.*;
import com.example.demo.dao.EdificioRepository;
import com.example.demo.dao.PersonaRepository;
import com.example.demo.dao.UnidadRepository;
import com.example.demo.model.*;
import com.example.demo.views.*;

@SpringBootApplication
public class Application implements CommandLineRunner {
	

	@Autowired
	Controlador controlador;
	@Autowired
	EdificioRepository edificioRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		/*List<EdificioView> views = controlador.getEdificios();
		for( EdificioView v: views ) {
			System.out.println( v.getDireccion() );
		}*/
		
		List<PersonaView> view = controlador.dueniosPorEdificio(1);
		int i = 0;
		for( PersonaView v: view ) {
			i++;
			System.out.println( v.getNombre() );
		}
		System.out.println( i );
		

		
		
		
	}

}
