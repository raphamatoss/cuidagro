package com.cuidagro.server;
import com.cuidagro.server.helpers.Endereco;

public class Agricultor extends Usuario {
    private Endereco endereco;
    private String numero;
    private String email;

    public Agricultor(String nome, String cpf, Integer idade, Endereco endereco, String numero, String email) {
        super(nome, cpf, idade);
        this.endereco = endereco;
        this.numero = numero;
        this.email = email;
    }

    public Agricultor(String nome, String cpf, Integer idade) {
        super(nome, cpf, idade);
        endereco = null;
        numero = null;
        email = null;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
