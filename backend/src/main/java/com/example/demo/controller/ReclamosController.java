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
public class ReclamosController {
    @Autowired
	EdificioRepository edificioRepository;
	@Autowired
	PersonaRepository personaRepository;
	@Autowired
	UnidadRepository unidadRepository;
	@Autowired
	ReclamoRepository reclamoRepository;

    @GetMapping("/reclamos/edificio/{codigo}")
    public List<ReclamoView> reclamosPorEdificio(@PathVariable int codigo){
		Edificio ed = edificioRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByEdificio(ed);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
		}
		return resultado;
	}

    @GetMapping("/reclamos/unidad/codigo={codigo}&piso={piso}&numero={numero}")
    public List<ReclamoView> reclamosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) {
		Unidad un = unidadRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByUnidad(un);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView());
		}
		return resultado;
	}

    @GetMapping("/reclamos/{numero}")
    public ReclamoView reclamoPorNumero(@PathVariable int numero) {
		Optional<Reclamo> reclamo = reclamoRepository.findById( numero );
		ReclamoView resultado = null;
		if( reclamo.isPresent() ) {
			resultado = reclamo.get().toView();
		}
		return resultado;
	}


    /*OJO CON ESTE METODO NO FUNCIONA EL ESTADO PORQUE ES UN OBJETO*/
    @GetMapping("/reclamos/persona/{documento}&estado={estado}")
    public List<ReclamoView> reclamosPorPersona(@PathVariable String documento, @PathVariable Estado estado) {
		//TODO: Se debe poder filtrar por nuevos, cerrados, etc
		if (estado != null){
			Persona persona = personaRepository.findById( documento ).get();
			List<Reclamo> reclamos = reclamoRepository.findByUsuarioAndEstado(persona, estado);
			List<ReclamoView> resultado = new ArrayList<ReclamoView>();
			for( Reclamo r: reclamos ) {
				resultado.add( r.toView() );
			}
			return resultado;
		}else{
			Persona persona = personaRepository.findById( documento ).get();
			List<Reclamo> reclamos = reclamoRepository.findByUsuario( persona );
			List<ReclamoView> resultado = new ArrayList<ReclamoView>();
			for( Reclamo r: reclamos ) {
				resultado.add( r.toView() );
			}
			return resultado;
		}
	}


    
}
