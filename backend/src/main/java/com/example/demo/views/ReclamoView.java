package com.example.demo.views;

import java.util.List;

public class ReclamoView {

	private int numero;
	private PersonaView usuario;
	private EdificioView edificio;
	private String ubicacion;
	private String descripcion;
	private UnidadView unidad;
	//private Estado estado;
	private List<ImagenView> imagenes;
	
	
	public ReclamoView(int numero, PersonaView usuario, EdificioView edificio, String ubicacion, String descripcion, UnidadView unidad, List<ImagenView> imagenes) {
		this.numero = numero;
		this.usuario = usuario;
		this.edificio = edificio;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.unidad = unidad;
		this.imagenes = imagenes;
	}

	@Override
	public String toString() {
		return "ReclamoView [numero=" + numero + ", edificio=" + edificio + ", ubicacion=" + ubicacion + "]";
	}
	
	public int getNumero() {
		return numero;
	}
	
	


	public void setNumero(int numero) {
		this.numero = numero;
	}
	public PersonaView getUsuario() {
		return usuario;
	}
	public void setUsuario(PersonaView usuario) {
		this.usuario = usuario;
	}
	public EdificioView getEdificio() {
		return edificio;
	}
	public void setEdificio(EdificioView edificio) {
		this.edificio = edificio;
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
	public UnidadView getUnidad() {
		return unidad;
	}
	public void setUnidad(UnidadView unidad) {
		this.unidad = unidad;
	}
	public List<ImagenView> getImagenes() {
		return imagenes;
	}
	public void setImagenes(List<ImagenView> imagenes) {
		this.imagenes = imagenes;
	}
	

}