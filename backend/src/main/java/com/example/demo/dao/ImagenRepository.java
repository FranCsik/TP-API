package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Imagen;

public interface ImagenRepository extends JpaRepository<Imagen, Integer>{
    
}
