package com.example.demo.exceptions;

import java.io.IOException;

public class ReclamoException extends Exception {

	private static final long serialVersionUID = 6646850323041998390L;

	public ReclamoException(String mensaje, IOException e) {
		super(mensaje);
	}
}