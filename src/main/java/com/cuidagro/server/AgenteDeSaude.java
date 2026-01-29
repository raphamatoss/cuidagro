package com.cuidagro.server;

import java.time.LocalDate;

public class AgenteDeSaude extends Usuario {
    private String identificador;

    public AgenteDeSaude(String nome, String cpf, LocalDate dataNascimento, String identificador, String email, String numero) {
        super(nome, cpf, dataNascimento, email, numero);
        this.identificador = identificador;
    }

    public AgenteDeSaude(String nome, String cpf, LocalDate dataNascimento, String email, String numero) {
        super(nome, cpf, dataNascimento, email, numero);
        this.identificador = null;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }
}
