package com.cuidagro.server;

import com.cuidagro.server.enums.Risco;
import com.cuidagro.server.enums.StatusDiagnostico;
import com.cuidagro.server.observerAndSubjects.Subject;

import java.time.LocalDateTime;



public class Diagnostico extends Subject {
    private LocalDateTime dataDeRegistro;
    private Agricultor agricultor;
    private Risco risco;
    private String diagnostico;
    private StatusDiagnostico status;
    private Medico medicoResponsavel;

    // Construtor para diagnóstico gerado por IA
    public Diagnostico(Agricultor agricultor, Risco risco, String diagnostico, StatusDiagnostico status) {
        dataDeRegistro = LocalDateTime.now();
        this.agricultor = agricultor;
        this.risco = risco;
        this.diagnostico = diagnostico;
        this.status = status;
        this.medicoResponsavel = null;
    }

    // Construtor para diagnóstico gerado por Médico
    public Diagnostico(Agricultor agricultor, Risco risco, String diagnostico, StatusDiagnostico status, Medico medicoResponsavel) {
        dataDeRegistro = LocalDateTime.now();
        this.agricultor = agricultor;
        this.risco = risco;
        this.diagnostico = diagnostico;
        this.status = status;
        this.medicoResponsavel = medicoResponsavel;
    }

    //to-do resolvido.
    public boolean emitirAlerta() {
        if (!StatusDiagnostico.conferidoPorMedico(status)) {
            Alerta alerta = new Alerta(this);
            notificarObservers(alerta);

            return true;
        }
        return false;
    }

    public LocalDateTime getDataDeRegistro() {
        return dataDeRegistro;
    }

    public void setDataDeRegistro(LocalDateTime dataDeRegistro) {
        this.dataDeRegistro = dataDeRegistro;
    }

    public Agricultor getAgricultor() {
        return agricultor;
    }

    public void setAgricultor(Agricultor agricultor) {
        this.agricultor = agricultor;
    }

    public Risco getRisco() {
        return risco;
    }

    public void setRisco(Risco risco) {
        this.risco = risco;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public StatusDiagnostico getStatus() {
        return status;
    }

    public void setStatus(StatusDiagnostico status) {
        this.status = status;
    }

    public Medico getMedicoResponsavel() {
        return medicoResponsavel;
    }

    public void setMedicoResponsavel(Medico medicoResponsavel) {
        this.medicoResponsavel = medicoResponsavel;
    }
}
