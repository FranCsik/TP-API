package com.example.demo.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.demo.views.EdificioView;

import jakarta.persistence.*;

@Entity
@Table(name="edificios")
public class Edificio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int codigo;
	private String nombre;
	private String direccion;
	@OneToMany(fetch = FetchType.EAGER, mappedBy="edificio")
	private List<Unidad> unidades;
	
	public Edificio(int codigo, String nombre, String direccion) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.direccion = direccion;
	}
	public Edificio() {}
	
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public void setUnidades(List<Unidad> unidades) {
		this.unidades = unidades;
	}

	
	public void agregarUnidad(Unidad unidad) {
		unidades.add(unidad);
	}
	
	public List<Persona> habilitados(){
		Set<Persona> habilitados = new HashSet<Persona>();
		for(Unidad unidad : unidades) {
			List<Persona> duenios = unidad.getDuenios();
			for(Persona p : duenios)
				habilitados.add(p);
			List<Persona> inquilinos = unidad.getInquilinos();
			for(Persona p : inquilinos)
				habilitados.add(p);
		}
		return new ArrayList<Persona>(habilitados);
	}

	public int getCodigo() {
		return codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public List<Unidad> getUnidades() {
		return unidades;
	}

	public List<Persona> duenios() {
		Set<Persona> resultado = new HashSet<Persona>();
		for(Unidad unidad : unidades) {
			List<Persona> duenios = unidad.getDuenios();
			for(Persona p : duenios)
				resultado.add(p);
		}
		return new ArrayList<Persona>(resultado);
	}

	public List<Persona> habitantes() {
		Set<Persona> resultado = new HashSet<Persona>();
		for(Unidad unidad : unidades) {
			if(unidad.estaHabitado()) {
				List<Persona> inquilinos = unidad.getInquilinos();
				if(inquilinos.size() > 0) 
					for(Persona p : inquilinos)
						resultado.add(p);
				else {
					List<Persona> duenios = unidad.getDuenios();
					for(Persona p : duenios)
						resultado.add(p);
				}
			}
		}
		return new ArrayList<Persona>(resultado);
	}

	public EdificioView toView() {
		return new EdificioView(codigo, nombre, direccion);
	}

	
}
