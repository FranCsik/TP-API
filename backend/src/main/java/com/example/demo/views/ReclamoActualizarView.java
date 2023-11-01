package com.example.demo.views;

public class ReclamoActualizarView {
    
    private String descripcion;
    private Estado estado;

    public ReclamoActualizarView() {
    }

    public ReclamoActualizarView(String descripcion, Estado estado) {
        this.descripcion = descripcion;
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    
}
