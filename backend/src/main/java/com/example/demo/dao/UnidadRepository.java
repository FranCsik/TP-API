package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Edificio;
import com.example.demo.model.Unidad;

public interface UnidadRepository extends JpaRepository<Unidad, Integer > {
	Optional<Unidad> findByEdificioAndPisoAndNumero(Edificio edificio, String piso, String numero);
}
