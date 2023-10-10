package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

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
		List<EdificioView> views = new ArrayList<EdificioView>();
		for(Edificio e: controlador.getEdificios()) {
			views.add( e.toView() );
		}
		return views;
    }

    @PostMapping("/edificios")
    public EdificioView crearEdificio(@RequestBody EdificioView edificio){
		Edificio edificioModel = controlador.agregarEdificio(edificio.toModel());
		return edificioModel.toView();
    }

	@DeleteMapping("/edificios/{codigo}")
	public void borrarEdificio(@RequestBody int codigo) {
		try{
			Edificio edificio = controlador.buscarEdificio(codigo);
			controlador.eliminarEdificio(edificio);
		}catch (EdificioException e){
			e.printStackTrace();
		}
	}

	@GetMapping("/edificios/{codigo}")
	public EdificioView getEdificio(@PathVariable int codigo) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		return edificio.toView();
	}

    @GetMapping("/edificios/{codigo}/unidades")
    public List<UnidadView> getUnidadesPorEdificio(@PathVariable int codigo) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		List<UnidadView> unidadesView = new ArrayList<UnidadView>();
		for(Unidad u: controlador.getUnidadesPorEdificio(edificio)) {
			unidadesView.add( u.toView() );
		}
		return unidadesView;
	}

    @GetMapping("/edificios/{codigo}/habilitados")
    public List<PersonaView> habilitadosPorEdificio(@PathVariable int codigo) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		for (Persona persona : controlador.habilitadosPorEdificio(edificio)) {
			resultado.add(persona.toView());
		}
		return resultado;
	}

    @GetMapping("/edificios/{codigo}/duenios")
    public List<PersonaView> dueniosPorEdificio(@PathVariable int codigo) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		for (Persona persona : controlador.dueniosPorEdificio(edificio)) {
			resultado.add(persona.toView());
		}
        return resultado;
    }
    @GetMapping("/edificios/{codigo}/habitantes")
	public List<PersonaView> habitantesPorEdificio(@PathVariable int codigo) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		for (Persona persona : controlador.habitantesPorEdificio(edificio)) {
			resultado.add(persona.toView());
		}
		return resultado;	
	}

    @GetMapping("/edificios/{codigo}/reclamos")
	public List<ReclamoView> reclamosPorEdificio(@PathVariable int codigo) throws EdificioException{
		Edificio edificio = controlador.buscarEdificio(codigo);
		List<ReclamoView> resultado = new ArrayList<ReclamoView>();
		for (Reclamo reclamo : controlador.reclamosPorEdificio(edificio)) {
			resultado.add(reclamo.toView());
		}
		return resultado;
	}


}
