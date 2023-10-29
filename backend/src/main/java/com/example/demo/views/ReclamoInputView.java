package com.example.demo.views;

import java.util.List;

public class ReclamoInputView {
	private String documento;
	private int codigoEdificio;
	private String ubicacion;
	private String descripcion;
	private UnidadInputView unidad;
	private Estado estado;
	private List<String> numerosImagenes;

    public ReclamoInputView() {
    }

    public ReclamoInputView(String documento, int codigoEdificio, String ubicacion, String descripcion, UnidadInputView unidad, Estado estado, List<String> numerosImagenes) {
        this.documento = documento;
        this.codigoEdificio = codigoEdificio;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
        this.unidad = unidad;
        this.estado = estado;
        this.numerosImagenes = numerosImagenes;
    }

    public String getdocumento() {
        return documento;
    }

    public void setdocumento(String documento) {
        this.documento = documento;
    }

    public int getCodigoEdificio() {
        return codigoEdificio;
    }

    public void setCodigoEdificio(int codigoEdificio) {
        this.codigoEdificio = codigoEdificio;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public UnidadInputView getunidad() {
        return unidad;
    }

    public void setunidad(UnidadInputView unidad) {
        this.unidad = unidad;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public List<String> getNumerosImagenes() {
        return numerosImagenes;
    }

    public void setNumerosImagenes(List<String> numerosImagenes) {
        this.numerosImagenes = numerosImagenes;
    }
}
