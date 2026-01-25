package com.cuidagro.server;

public class Enfermeiro extends Usuario {
    private String coren;

    public Enfermeiro(String nome, String cpf, Integer idade, String coren) {
        super(nome, cpf, idade);
        this.coren = coren;
    }

    public Enfermeiro(String nome, String cpf, Integer idade) {
        super(nome, cpf, idade);
        this.coren = null;
    }

    public String getCoren() {
        return coren;
    }

    public void setCoren(String coren) {
        this.coren = coren;
    }
}
