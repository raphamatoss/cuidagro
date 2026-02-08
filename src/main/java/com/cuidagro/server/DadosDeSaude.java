package com.cuidagro.server;

import java.util.ArrayList;

public class DadosDeSaude {
    private Float peso;
    private Float altura;
    private ArrayList<Doenca> doencas;

    public DadosDeSaude () {}

    public DadosDeSaude(Float peso, Float altura, ArrayList<Doenca> doencas) {
        this.peso = peso;
        this.altura = altura;
        this.doencas = doencas;
    }

    public Float getPeso() {
        return peso;
    }

    public void setPeso(Float peso) {
        this.peso = peso;
    }

    public Float getAltura() {
        return altura;
    }

    public void setAltura(Float altura) {
        this.altura = altura;
    }

    public ArrayList<Doenca> getDoencas() {
        return doencas;
    }

    public void setDoencas(ArrayList<Doenca> doencas) {
        this.doencas = doencas;
    }
}
