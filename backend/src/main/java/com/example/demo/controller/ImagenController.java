package com.example.demo.controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.*;
import com.example.demo.views.*;

import com.example.demo.dao.*;
import com.example.demo.exceptions.*;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ImagenController {
    @Autowired
	EdificioRepository edificioRepository;
	@Autowired
	PersonaRepository personaRepository;
	@Autowired
	UnidadRepository unidadRepository;
	@Autowired
	ReclamoRepository reclamoRepository;
	@Autowired
	Controlador controlador;
	
	//private final String directorioImagenes = "C:/Users/Usuario/eclipse-workspace/TPO-API-pruebitas-2/src/main/java/com/example/demo/imagenes/";
	
	@PostMapping("/reclamo/imagen")
	public ResponseEntity<String> subirImagen(@RequestParam int reclamoId, @RequestParam("file") MultipartFile file) throws Exception {
	    try {
	        System.out.println("Recibida la solicitud para subir una imagen al reclamo con ID: " + reclamoId);
	        String imagePath = controlador.guardarImagen(reclamoId, file);
	        System.out.println("Imagen guardada exitosamente en: " + imagePath);
	        return new ResponseEntity<>(imagePath, HttpStatus.OK);
	    } catch (ReclamoException e) {
	        // Manejar excepciones específicas aquí según tus necesidades
	        System.err.println("Error al subir la imagen: " + e.getMessage());
	        return new ResponseEntity<>("Error al subir la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	//Al crear una carpeta en el escritorio por ahi cambia su ruta, así que acá poner 
	//la ruta en donde está la carpeta "imagenes" que crearon, se podría poner la carpeta en este 
	//proyecto también.
	private final String directorioImagenes = "C:/Users/Usuario/Desktop/imagenes/";

	@GetMapping("/{nombreArchivo:.+}")
    public ResponseEntity<Resource> servirImagen(@RequestParam int reclamoId, @RequestParam String nombreArchivo) {
		try {
	        String carpetaReclamo = directorioImagenes + reclamoId + "/";
	        File file = new File(carpetaReclamo + nombreArchivo);
	        System.out.println("Ruta completa de la imagen: " + file.getAbsolutePath());

	        if (file.exists() && file.isFile()) {
	            Resource recursoImagen = new FileSystemResource(file);
	            return ResponseEntity.ok()
	                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recursoImagen.getFilename() + "\"")
	                    .body(recursoImagen);
	        } else {
	            System.out.println("La imagen no existe en la ruta especificada.");
	            return ResponseEntity.notFound().build();
	        }
	    } catch (Exception e) {
	        System.out.println("Error al intentar servir la imagen: " + e.getMessage());
	        return ResponseEntity.status(500).body(null);
	    }
    }
	
}