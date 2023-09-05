package com.example.demo.model;

import com.example.demo.views.ImagenView;

import jakarta.persistence.*;

@Entity
@Table(name="imagenes")
public class Imagen {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int numero;
	@Column(name="path")
	private String direccion;
	private String tipo;
	
	public Imagen(String direccion, String tipo) {
		this.direccion = direccion;
		this.tipo = tipo;
	}
	
	public Imagen() {}

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
	
	public ImagenView toView() {
		return new ImagenView( numero, direccion, tipo );  
	}
}