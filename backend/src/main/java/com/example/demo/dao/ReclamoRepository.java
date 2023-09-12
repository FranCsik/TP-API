package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Edificio;
import com.example.demo.model.Persona;
import com.example.demo.model.Reclamo;
import com.example.demo.model.Unidad;
import com.example.demo.views.Estado;

public interface ReclamoRepository extends JpaRepository<Reclamo, Integer> {
	List<Reclamo> findByEdificio(Edificio edificio);
	List<Reclamo> findByUnidad(Unidad unidad);
	List<Reclamo> findByUsuario(Persona persona);
	List<Reclamo> findByUsuarioAndEstado(Persona persona, Estado estado);
}
