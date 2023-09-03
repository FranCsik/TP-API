package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.PersonaRepository;
import com.example.demo.model.Persona;

@Service
public class PersonaService {
	@Autowired
	PersonaRepository personaRepository;
	
	public List<Persona> obtenerPersonas(){
		return personaRepository.findAll();
	}
}
