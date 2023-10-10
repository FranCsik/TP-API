package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.controller.Controlador;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class EdificioTests {

    @Autowired
	Controlador controlador;

    @Test
	void contextLoads() {
		
	}

    
    
}
