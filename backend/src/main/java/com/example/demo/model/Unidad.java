package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;


import org.hibernate.type.YesNoConverter;

import com.example.demo.exceptions.UnidadException;
import com.example.demo.views.PersonaView;
import com.example.demo.views.UnidadView;

import jakarta.persistence.*;
@Entity
@Table(name="unidades")
public class Unidad {
	@Column(name="identificador")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String piso;
	private String numero;
	@Convert(converter = YesNoConverter.class)
	private boolean habitado;
	@ManyToOne
	@JoinColumn(name="codigoedificio")
	private Edificio edificio;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
	        name = "duenios", 
	        joinColumns = { @JoinColumn(name = "identificador") }, 
	        inverseJoinColumns = { @JoinColumn(name = "documento"), }
	    )
	private List<Persona> duenios;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
	        name = "inquilinos", 
	        joinColumns = { @JoinColumn(name = "identificador") }, 
	        inverseJoinColumns = { @JoinColumn(name = "documento") }
	    )
	private List<Persona> inquilinos;
	
	public Unidad( String piso, String numero, Edificio edificio) {
		this.piso = piso;
		this.numero = numero;
		this.habitado = false;
		this.edificio = edificio;
		this.duenios = new ArrayList<Persona>();
		this.inquilinos = new ArrayList<Persona>();
	}
	
	public Unidad() {}

	public void transferir(List<Persona> nuevosDuenios) {
		duenios = nuevosDuenios;
	}
	
	public void agregarDuenio(Persona duenio) {
		duenios.add(duenio);
	}
	
	public void alquilar(List<Persona> inquilinos) throws UnidadException {
		if(!this.habitado) {
			this.habitado = true;
			for (Persona inquilino : inquilinos)
				this.inquilinos.add(inquilino);
		}
		else
			throw new UnidadException("La unidad esta ocupada");
	}

	public void agregarInquilino(Persona inquilino) throws UnidadException{
		if(!this.habitado){
			throw new UnidadException("La unidad no esta alquilada");
		}
		inquilinos.add(inquilino);
	}

	public void deshabitar(){
		this.habitado = false;
	}
	
	public boolean estaHabitado() {
		return habitado;
	}
	
	public void liberar() {
		this.inquilinos = new ArrayList<Persona>();
		this.habitado = false;
	}
	
	public void habitar() throws UnidadException {
		if(this.habitado)
			throw new UnidadException("La unidad ya esta habitada");
		else
			this.habitado = true;
	}
	
	public int getId() {
		return id;
	}

	public String getPiso() {
		return piso;
	}

	public String getNumero() {
		return numero;
	}

	
	public Edificio getEdificio() {
		return edificio;
	}

	public List<Persona> getDuenios() {
		return duenios;
	}

	public List<Persona> getInquilinos() {
		return inquilinos;
	}

	

	public UnidadView toView() {
		// EdificioView auxEdificio = edificio.toView();
		List<PersonaView> inquilinosView = new ArrayList<PersonaView>();
		List<PersonaView> dueniosView = new ArrayList<PersonaView>();
		for(Persona inquilino : this.inquilinos) {
			inquilinosView.add(inquilino.toView());
		}
		for(Persona duenio : this.duenios) {
			dueniosView.add(duenio.toView());
		}
		return new UnidadView(piso, numero, habitado, edificio.toView(), inquilinosView, dueniosView);
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPiso(String piso) {
		this.piso = piso;
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

	public void setEdificio(Edificio edificio) {
		this.edificio = edificio;
	}

	public void setDuenios(List<Persona> duenios) {
		this.duenios = duenios;
	}

	public void setInquilinos(List<Persona> inquilinos) {
		this.inquilinos = inquilinos;
	}
}