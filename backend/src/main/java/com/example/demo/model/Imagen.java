package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name="imagenes")
public class Imagen {
	
	@Id
	private int numero;
	@Column(name="path")
	private String direccion;
	private String tipo;
	
	public Imagen(String direccion, String tipo) {
		this.direccion = direccion;
		this.tipo = tipo;
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
}