package com.example.demo.views;

import com.example.demo.model.Persona;

public class PersonaCreateView {

    private String documento;
	private String nombre;
    private String password;
    private String mail;
	
	public PersonaCreateView() {}

    public PersonaCreateView(String documento, String nombre, String password, String mail) {
        this.documento = documento;
        this.nombre = nombre;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
    
    public Persona toModel() {
    	return new Persona(documento, nombre, mail, password);
    }
    

}