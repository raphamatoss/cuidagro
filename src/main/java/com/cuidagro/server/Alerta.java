package com.cuidagro.server;

import com.cuidagro.server.enums.Risco;
import com.cuidagro.server.enums.StatusAlerta;

import java.time.LocalDateTime;

public class Alerta {
    private LocalDateTime dataDeRegistro;
    private Diagnostico diagnostico;
    private Agricultor agricultor;
    private StatusAlerta status;
    private Risco risco;

    public Alerta(Diagnostico diagnostico) {
        this.diagnostico = diagnostico;
        dataDeRegistro = LocalDateTime.now();
        agricultor = diagnostico.getAgricultor();
        risco = diagnostico.getRisco();
        status = StatusAlerta.PENDENTE;
    }

    // Construtor para reconstruir o objeto vindo do Banco de Dados
    public Alerta(LocalDateTime dataDeRegistro, StatusAlerta status, Risco risco, Agricultor agricultor) {
        this.dataDeRegistro = dataDeRegistro;
        this.status = status;
        this.risco = risco;
        this.agricultor = agricultor;
        // Dúvida se no banco de dados ele vai funcionar assim após pegar o ID.
        this.diagnostico = null;
    }

    public LocalDateTime getDataDeRegistro() {
        return dataDeRegistro;
    }

    public void setDataDeRegistro(LocalDateTime dataDeRegistro) {
        this.dataDeRegistro = dataDeRegistro;
    }

    public Diagnostico getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(Diagnostico diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Agricultor getAgricultor() {
        return agricultor;
    }

    public void setAgricultor(Agricultor agricultor) {
        this.agricultor = agricultor;
    }

    public StatusAlerta getStatus() {
        return status;
    }

    public void setStatus(StatusAlerta status) {
        this.status = status;
    }

    public Risco getRisco() {
        return risco;
    }

    public void setRisco(Risco risco) {
        this.risco = risco;
    }
}

