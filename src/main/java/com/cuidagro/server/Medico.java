package com.cuidagro.server;

import com.cuidagro.server.enums.Especialidade;
import com.cuidagro.server.enums.PapelUsuario;

import java.time.LocalDate;

public class Medico extends Usuario {
    private String crm;
    private Especialidade especialidade;

    public Medico() {}

    public Medico(String nome, String cpf, LocalDate dataNascimento, String crm, Especialidade especialidade, String email, String numero) {
        super(nome, cpf, dataNascimento, email, numero);
        this.crm = crm;
        this.especialidade = especialidade;
    }

    public Medico(String nome, String cpf, LocalDate dataNascimento, String crm, Especialidade especialidade, String email, String numero, String senha, PapelUsuario papel) {
        super(nome, cpf, dataNascimento, email, numero, senha, papel);
        this.crm = crm;
        this.especialidade = especialidade;
    }

    public Medico(String nome, String cpf, LocalDate dataNascimento, String email, String numero) {
        super(nome, cpf, dataNascimento, email, numero);
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
