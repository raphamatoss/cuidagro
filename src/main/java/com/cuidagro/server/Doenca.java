package com.cuidagro.server;

public class Doenca {
    private String nome;
    public Doenca () {}
    public Doenca (String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
