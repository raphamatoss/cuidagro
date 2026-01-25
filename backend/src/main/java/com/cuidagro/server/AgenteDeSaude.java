package com.cuidagro.server;

public class AgenteDeSaude extends Usuario {
    private String identificador;

    public AgenteDeSaude(String nome, String cpf, Integer idade, String identificador) {
        super(nome, cpf, idade);
        this.identificador = identificador;
    }

    public AgenteDeSaude(String nome, String cpf, Integer idade) {
        super(nome, cpf, idade);
        this.identificador = null;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }
}
