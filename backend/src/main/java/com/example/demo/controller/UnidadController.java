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
public class UnidadController {
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
	@GetMapping("/unidades")
	public List<UnidadView> getUnidades(){
		List<UnidadView> unidadesView = new ArrayList<UnidadView>();
		for(Unidad unidad : controlador.tomarUnidades()) {
			unidadesView.add(unidad.toView());
		}
		return unidadesView;
	}

	@CrossOrigin
	@GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}")
	public UnidadView getUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException{
		Unidad unidad = controlador.buscarUnidad(codigo, piso, numero);
		return unidad.toView();
	}

	@CrossOrigin
	@PostMapping("/unidades")
	public UnidadView createUnidad(@RequestBody UnidadInputView unidad) throws UnidadException, EdificioException{
		return controlador.agregarUnidad(new Unidad(unidad.getPiso(), unidad.getNumero(), controlador.buscarEdificio(unidad.getCodigoEdificio()))).toView();
	}

	@CrossOrigin
	@PutMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}")
	public UnidadView updateUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody UnidadInputView unidad) throws UnidadException, EdificioException{
		return controlador.modificarUnidad(controlador.buscarUnidad(codigo, piso, numero), unidad).toView();
	}

	@CrossOrigin
	@GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/reclamos")
	public List<ReclamoView> reclamosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException{
		return controlador.devolverListaReclamosView(controlador.reclamosPorUnidad(controlador.buscarUnidad(codigo, piso, numero)));
	}

	@CrossOrigin
    @GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/duenios")
    public List<PersonaView> dueniosPorUnidad(@PathVariable int codigo, @PathVariable  String piso, @PathVariable String numero) throws UnidadException{
		return controlador.devolverListaPersonasView(controlador.buscarUnidad(codigo, piso, numero).getDuenios());
	}

	@CrossOrigin
    @GetMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/inquilinos")
    public List<PersonaView> inquilinosPorUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException{
		return controlador.devolverListaPersonasView(controlador.buscarUnidad(codigo, piso, numero).getInquilinos());
	}

	@CrossOrigin
    @PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/transferir")	
    public UnidadView transferirUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody List<DocumentoView> personas) throws UnidadException, PersonaException {
		return controlador.transferirUnidad(controlador.buscarUnidad(codigo, piso, numero), controlador.buscarPersonas(personas)).toView();
	}

	@CrossOrigin
	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/agregarDuenio/{documento}")
	public UnidadView agregarDuenioUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @PathVariable String documento) throws UnidadException, PersonaException {
		return controlador.agregarDuenioUnidad(controlador.buscarUnidad(codigo, piso, numero), controlador.buscarPersona(documento)).toView();
	}

	@CrossOrigin
	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/alquilar")
	public UnidadView alquilarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @RequestBody(required = false) List<DocumentoView> documentos) throws UnidadException, PersonaException{
		return controlador.alquilarUnidad(controlador.buscarUnidad(codigo, piso, numero), documentos).toView();
	}

	@CrossOrigin
	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/agregarInquilino/{documento}")
	public UnidadView agregarInquilinoUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @PathVariable String documento) throws UnidadException, PersonaException{
		return controlador.agregarInquilinoUnidad(controlador.buscarUnidad(codigo, piso, numero), controlador.buscarPersona(documento)).toView();
	}

	@CrossOrigin
	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/liberar")
	public UnidadView liberarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		return controlador.liberarUnidad(controlador.buscarUnidad(codigo, piso, numero)).toView();
	}

	@CrossOrigin
	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/habitar")
	public UnidadView habitarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		return controlador.habitarUnidad(controlador.buscarUnidad(codigo, piso, numero)).toView();
	}

	@CrossOrigin
	@DeleteMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}")
	public void eliminarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		controlador.eliminarUnidad(controlador.buscarUnidad(codigo, piso, numero));
	}

	@CrossOrigin
	@PostMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/deshabitar")
	public UnidadView deshabitarUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero) throws UnidadException {
		return controlador.deshabitarUnidad(controlador.buscarUnidad(codigo, piso, numero)).toView();
	}

	@CrossOrigin
	@DeleteMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/eliminarInquilino/{documento}")
	public UnidadView eliminarInquilinoUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @PathVariable String documento) throws UnidadException, PersonaException {
		return controlador.eliminarInquilinoUnidad(controlador.buscarUnidad(codigo, piso, numero), controlador.buscarPersona(documento)).toView();
	}

	@CrossOrigin
	@DeleteMapping("/unidades/codigo={codigo}&piso={piso}&numero={numero}/eliminarDuenio/{documento}")
	public UnidadView eliminarDuenioUnidad(@PathVariable int codigo, @PathVariable String piso, @PathVariable String numero, @PathVariable String documento) throws UnidadException, PersonaException {
		return controlador.eliminarDuenioUnidad(controlador.buscarUnidad(codigo, piso, numero), controlador.buscarPersona(documento)).toView();
	}
}
