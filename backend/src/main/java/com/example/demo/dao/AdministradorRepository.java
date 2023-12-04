package com.example.demo.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Administrador;
import com.example.demo.model.Persona;

import java.util.Optional;


public interface AdministradorRepository extends JpaRepository<Administrador, Integer>{
    Optional<Administrador> findByPersona(Persona persona);
}
