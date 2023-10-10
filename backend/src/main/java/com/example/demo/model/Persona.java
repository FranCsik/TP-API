package com.example.demo.model;

import com.example.demo.views.PersonaCreateView;
import com.example.demo.views.PersonaView;

import jakarta.persistence.*;

@Entity
@Table(name="personas")
public class Persona {
	
	@Id
	private String documento;
	private String nombre;
	private String mail;
	@Column(name="contrasenia")
	private String password;

	public Persona(String documento, String nombre, String mail, String password) {
		this.documento = documento;
		this.nombre = nombre;
		this.mail = mail;
		this.password = password;
	}
	
	public Persona() {}

	public void cambiarPassword(String password) {
		this.password = password;
	}
	
	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public PersonaView toView() {
		return new PersonaView(documento, nombre);
	}

	public PersonaCreateView toCreateView() {
		return new PersonaCreateView(documento, nombre, password, mail);
	}
}
