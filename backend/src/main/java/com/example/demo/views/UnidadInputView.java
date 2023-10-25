package com.example.demo.views;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.controller.Controlador;

public class UnidadInputView {

    @Autowired
    Controlador controlador;

    private String piso;
	private String numero;
	private int codigoEdificio;

    public UnidadInputView() {}

    public UnidadInputView(String piso, String numero, int codigoEdificio) {
		this.piso = piso;
		this.numero = numero;
		this.codigoEdificio = codigoEdificio;
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

    public int getCodigoEdificio() {
        return codigoEdificio;
    }

    public void setCodigoEdificio(int codigoEdificio) {
        this.codigoEdificio = codigoEdificio;
    }
    
}
