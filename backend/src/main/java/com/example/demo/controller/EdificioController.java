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
public class EdificioController {

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

    @GetMapping("/edificios")
    public List<EdificioView> getEdificios(){
        List<Edificio> edificios = edificioRepository.findAll();
		List<EdificioView> views = new ArrayList<EdificioView>();
		for(Edificio e: edificios) {
			views.add( e.toView() );
		}
		return views;
    }

    @PostMapping("/edificios/crear")
    public void crearEdificio(@RequestBody Edificio edificio){
        edificioRepository.save( edificio );
        
    }

    @GetMapping("/edificios/{codigo}/unidades")
    public List<UnidadView> getUnidadesPorEdificio(@PathVariable int codigo) throws EdificioException{
		List<UnidadView> resultado = new ArrayList<UnidadView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ) {
			List<Unidad> unidades = edificio.get().getUnidades();
			for(Unidad unidad : unidades)
				resultado.add(unidad.toView());
		}
		return resultado;
	}

    @GetMapping("/edificios/{codigo}/habilitados")
    public List<PersonaView> habilitadosPorEdificio(@PathVariable int codigo) throws EdificioException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ) {
			Set<Persona> habilitados = edificio.get().habilitados();
			for(Persona persona : habilitados)
				resultado.add(persona.toView());			
		}
		return resultado;
	}

    @GetMapping("/edificios/{codigo}/duenios")
    public List<PersonaView> dueniosPorEdificio(@PathVariable int codigo) throws EdificioException{
        List<PersonaView> resultado = new ArrayList<PersonaView>();
        Optional<Edificio> edificio = edificioRepository.findById( codigo );
        if( edificio.isPresent() ) {
            List<Unidad> unidades = edificio.get().getUnidades();
            for(Unidad unidad : unidades) {
                List<Persona> duenios = unidad.getDuenios();
                for(Persona persona : duenios)
                    resultado.add(persona.toView());
            }
        }
        return resultado;
    }
    @GetMapping("/edificios/{codigo}/habitantes")
	public List<PersonaView> habitantesPorEdificio(int codigo) throws EdificioException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Optional<Edificio> edificio = edificioRepository.findById( codigo );
		if( edificio.isPresent() ){
			for(Persona persona : edificio.get().habitantes()) {
				resultado.add(persona.toView());					
			}

		}
		return resultado;	
	}

    @GetMapping("/edificios/{codigo}/reclamos")
	public List<ReclamoView> reclamosPorEdificio(@PathVariable int codigo){
		Edificio ed = edificioRepository.findById( codigo ).get();
		List<Reclamo> reclamos = reclamoRepository.findByEdificio(ed);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for( Reclamo r: reclamos ) {
			resultado.add( r.toView() );
		}
		return resultado;
	}


}
