package com.cuidagro.server;

public class Sintoma {
    private String sintoma;

    public Sintoma() {};

    public Sintoma(String sintoma){
        this.sintoma = sintoma;
    }

    public String getSintoma(){
        return sintoma;
    }

    public void setSintoma(String sintoma){
        this.sintoma = sintoma;
    }
}