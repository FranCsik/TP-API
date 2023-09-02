package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Unidad;

public interface UnidadRepository extends JpaRepository<Unidad, Integer > {
	Optional<Unidad> findByIdAndPisoAndNumero(int codigo, String piso, String numero);
}
