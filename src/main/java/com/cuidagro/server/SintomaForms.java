package com.cuidagro.server;


import java.time.LocalDateTime;
import java.util.ArrayList;

public class SintomaForms{
    private String cpf;
    private LocalDateTime data;
    private Sintoma[] sintomas;

    public SintomaForms() {};

    public SintomaForms(String cpf, Sintoma[] sintomas){
        this.cpf = cpf;
        data = LocalDateTime.now();
        this.sintomas = sintomas;
    }

    public String getCPF(){
        return cpf;
    }
    public LocalDateTime getData() {
        return data;
    }
    public Sintoma[] getSintomas() {
        return sintomas;
    }
}