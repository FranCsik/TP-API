package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.views.ImagenView;
import com.example.demo.views.ReclamoView;

import jakarta.persistence.*;

@Entity
@Table(name="reclamos")
public class Reclamo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idreclamo")
	private int numero;
	

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="documento")
	private Persona usuario;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="codigo")
	private Edificio edificio;
	private String ubicacion;
	private String descripcion;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="identificador")
	private Unidad unidad;
	//private Estado estado;
	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name="idreclamo")
	private List<Imagen> imagenes;
	
	public Reclamo(Persona usuario, Edificio edificio, String ubicacion, String descripcion, Unidad unidad) {
		this.usuario = usuario;
		this.edificio = edificio;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.unidad = unidad;
		//this.estado = Estado.nuevo;
		imagenes = new ArrayList<Imagen>();
	}
	
	public Reclamo() {}

	public void agregarImagen(String direccion, String tipo) {
		Imagen imagen = new Imagen(direccion, tipo);
		imagenes.add(imagen);
	}
	
	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public Persona getUsuario() {
		return usuario;
	}

	public Edificio getEdificio() {
		return edificio;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public Unidad getUnidad() {
		return unidad;
	}

	/*public Estado getEstado() {
		return estado;
	}*/
	
	public List<Imagen> getImagenes(){
		return this.imagenes;
	}
	
	/*public void cambiarEstado(Estado estado) {
		this.estado = estado;
	}*/
	
	public ReclamoView toView() {
		List<ImagenView> imagenesView = new ArrayList<ImagenView>();
		for( Imagen im: imagenes ) {
			imagenesView.add( im.toView() );
		}
		
		return new ReclamoView(numero, usuario.toView(), edificio.toView(), ubicacion, descripcion, unidad.toView(), imagenesView);
		
	}

}