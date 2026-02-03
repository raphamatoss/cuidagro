package com.cuidagro.server;
import com.cuidagro.server.helpers.Endereco;

import java.time.LocalDate;

public class Agricultor extends Usuario {
    private Endereco endereco;
    private Historico historico;

    public Agricultor(String nome, String cpf, LocalDate dataNascimento, Endereco endereco, String email, String numero) {
        super(nome, cpf, dataNascimento, email, numero);
        this.endereco = endereco;
        historico = new Historico();
    }

    public Agricultor(String nome, String cpf, LocalDate dataNascimento, String email, String numero) {
        super(nome, cpf, dataNascimento, email, numero);
        endereco = null;
        historico = new Historico();
    }

    public Agricultor(String nome, String cpf, LocalDate dataNascimento, String email, String numero, String senha) {
        super(nome, cpf, dataNascimento, email, numero, senha);
        endereco = null;
        historico = new Historico();
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Historico getHistorico() {
        return historico;
    }

    public void setHistorico(Historico historico) {
        this.historico = historico;
    }
}
