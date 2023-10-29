package com.example.demo.views;

public class LoginView {
    
    private String documento;
    private String password;

    public LoginView() {
    }

    public LoginView(String documento, String password) {
        this.documento = documento;
        this.password = password;
    }

    public String getdocumento() {
        return this.documento;
    }

    public void setdocumento(String documento) {
        this.documento = documento;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
