package com.cuidagro.server;

import com.cuidagro.server.enums.PapelUsuario;
import com.cuidagro.server.mediatorsAndComponents.Component;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Usuario extends Component {
    private PapelUsuario papel;
    private String nome;
    private String cpf;
    private Integer idade;
    @JsonProperty("datanascimento")
    private LocalDate dataNascimento;
    private String email;
    private String numero;
    private String senha;

    public Usuario () {}

    public Usuario(String nome, String cpf, LocalDate dataNascimento, String email, String numero) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.idade = (int) ChronoUnit.YEARS.between(dataNascimento, LocalDate.now());
        this.email = email;
        this.numero = numero;
    }

    public Usuario(String nome, String cpf, LocalDate dataNascimento, String email, String numero, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.idade = (int) ChronoUnit.YEARS.between(dataNascimento, LocalDate.now());
        this.email = email;
        this.numero = numero;
        this.senha = senha;
    }

    public Usuario(String nome, String cpf, LocalDate dataNascimento, String email, String numero, String senha, PapelUsuario papel) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.idade = (int) ChronoUnit.YEARS.between(dataNascimento, LocalDate.now());
        this.email = email;
        this.numero = numero;
        this.senha = senha;
        this.papel = papel;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Integer getIdade() {
        return idade;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumero() { return numero; }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        idade = (int) ChronoUnit.YEARS.between(dataNascimento, LocalDate.now());
    }

    public PapelUsuario getPapel() {
        return papel;
    }
}