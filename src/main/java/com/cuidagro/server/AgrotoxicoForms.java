package com.cuidagro.server;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class AgrotoxicoForms {
    @JsonProperty("cpf") // por algum motivo, sem a notação mapeando o Jackson não faz o mapeamento do cpf corretamente
    private String cpf;
    private Agrotoxico[] agrotoxicos;
    private LocalDateTime data;

    public AgrotoxicoForms() {}

    public AgrotoxicoForms(String cpf, Agrotoxico[] agrotoxicos, LocalDateTime data) {
        this.cpf = cpf;
        this.agrotoxicos = agrotoxicos;
        this.data = data;
    }

    public String getCPF() {
        return cpf;
    }

    public Agrotoxico[] getAgrotoxicos() {
        return agrotoxicos;
    }

    public LocalDateTime getData() {
        return data;
    }
}
