package com.cuidagro.server;

import com.cuidagro.server.enums.Especialidade;

public class Medico extends Usuario {
    private String crm;
    private Especialidade especialidade;

    public Medico(String nome, String cpf, Integer idade, String crm, Especialidade especialidade) {
        super(nome, cpf, idade);
        this.crm = crm;
        this.especialidade = especialidade;
    }

    public Medico(String nome, String cpf, Integer idade) {
        super(nome, cpf, idade);
        this.crm = null;
        especialidade = null;
    }

    public String getCrm() {
        return crm;
    }

    public void setCrm(String crm) {
        this.crm = crm;
    }

    public Especialidade getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(Especialidade especialidade) {
        this.especialidade = especialidade;
    }
}
