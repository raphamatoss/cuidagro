package com.cuidagro.client;

public abstract class Usuario {
    private String nome;
    private String cpf;
    private Integer idade;

    public Usuario(String nome, String cpf, Integer idade) {
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
    }

    protected abstract boolean logar();
}
