package com.example.demo.views;

import com.example.demo.model.Persona;

public class PersonaCreateView {

    private String documento;
	private String nombre;
    private String contrasenia;
    private String mail;
	
	public PersonaCreateView() {}

    public PersonaCreateView(String documento, String nombre, String contrasenia, String mail) {
        this.documento = documento;
        this.nombre = nombre;
        this.contrasenia = contrasenia;
        this.mail = mail;
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

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
    
    public Persona toModel() {
    	return new Persona(documento, nombre, mail, contrasenia);
    }
    

}