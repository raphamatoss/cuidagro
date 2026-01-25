package com.cuidagro.server.helpers;

import com.cuidagro.server.enums.UnidadeFederativa;

public class Endereco {
    private UnidadeFederativa estado;
    private String cidade;
    private String rua;
    private Integer cep;
    private Integer numero;
    private String complemento;

    public Endereco() {
        estado = null;
        cidade = null;
        rua = null;
        cep = null;
        numero = null;
        complemento = null;
    }

    public Endereco(UnidadeFederativa estado, String cidade, String rua, Integer cep, Integer numero, String complemento) {
        this.estado = estado;
        this.cidade = cidade;
        this.rua = rua;
        this.cep = cep;
        this.numero = numero;
        this.complemento = complemento;
    }

    public UnidadeFederativa getEstado() {
        return estado;
    }

    public void setEstado(UnidadeFederativa estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public Integer getCep() {
        return cep;
    }

    public void setCep(Integer cep) {
        this.cep = cep;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
}
