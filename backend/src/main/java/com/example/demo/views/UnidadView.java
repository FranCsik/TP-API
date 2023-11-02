package com.example.demo.views;

import java.util.List;

import com.example.demo.model.Unidad;

public class UnidadView {

	private int id;
	private String piso;
	private String numero;
	private boolean habitado;
	private EdificioView edificio;
	private List<PersonaView> inquilinos;
	private List<PersonaView> duenios;
	
	public UnidadView() {}

	public UnidadView(int id, String piso, String numero, boolean habitado, EdificioView edificio, List<PersonaView> inquilinos, List<PersonaView> duenios) {
		
		this.id = id;
		this.piso = piso;
		this.numero = numero;
		this.habitado = habitado;
		this.edificio = edificio;
		this.inquilinos = inquilinos;
		this.duenios = duenios;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPiso() {
		return piso;
	}

	public void setPiso(String piso) {
		this.piso = piso;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public boolean isHabitado() {
		return habitado;
	}

	public void setHabitado(boolean habitado) {
		this.habitado = habitado;
	}

	// public EdificioView getEdificio() {
	// 	return edificio;
	// }

	// public void setEdificio(EdificioView edificio) {
	// 	this.edificio = edificio;
	// }
	
	public String toString() {
		return piso + " " + numero;
	}

	public EdificioView getEdificio() {
		return edificio;
	}

	public void setEdificio(EdificioView edificio) {
		this.edificio = edificio;
	}

	public List<PersonaView> getInquilinos() {
		return inquilinos;
	}

	public void setInquilinos(List<PersonaView> inquilinos) {
		this.inquilinos = inquilinos;
	}

	public List<PersonaView> getDuenios() {
		return duenios;
	}

	public void setDuenios(List<PersonaView> duenios) {
		this.duenios = duenios;
	}

	public Unidad toModel(){
		return new Unidad(piso, numero, edificio.toModel());
	}
}