package com.cuidagro.server;

import com.cuidagro.server.helpers.Local;

import java.time.LocalDateTime;

public class Consulta {
    private LocalDateTime diaHora;
    private Local local;
    private Medico medico;
    private Agricultor agricultor;

    public Consulta(LocalDateTime diaHora, Local local, Medico medico, Agricultor agricultor) {
        this.diaHora = diaHora;
        this.local = local;
        this.medico = medico;
        this.agricultor = agricultor;
    }

    public LocalDateTime getDiaHora() {
        return diaHora;
    }

    public void setDiaHora(LocalDateTime diaHora) {
        this.diaHora = diaHora;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Agricultor getAgricultor() {
        return agricultor;
    }

    public void setAgricultor(Agricultor agricultor) {
        this.agricultor = agricultor;
    }
}
