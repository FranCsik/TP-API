package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Persona;

public interface PersonaRepository extends JpaRepository<Persona, String>{
    Optional<Persona> findByMail(String mail);

}
