package com.example.demo.views;

public class PersonaUpdateView {

    private String mail;
    private String contrasenia;
    private String nombre;

    public PersonaUpdateView() {}

    public PersonaUpdateView(String mail, String contrasenia, String nombre) {
        this.mail = mail;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    

}