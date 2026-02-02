package com.cuidagro.server;

import com.cuidagro.server.mediatorsAndComponents.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public abstract class Usuario extends Component {
    private String nome;
    private String cpf;
    private Integer idade;
    private LocalDate dataNascimento;
    private String email;
    private String numero;

    public Usuario(String nome, String cpf, LocalDate dataNascimento, String email, String numero) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.idade = (int) ChronoUnit.YEARS.between(dataNascimento, LocalDate.now());
        this.email = email;
        this.numero = numero;
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

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        idade = (int) ChronoUnit.YEARS.between(dataNascimento, LocalDate.now());
    }
}