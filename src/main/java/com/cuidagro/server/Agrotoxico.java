package com.cuidagro.server;

import com.cuidagro.server.enums.ClasseAgrotoxico;

public class Agrotoxico {
    private String nome;
    private ClasseAgrotoxico classe;

    public Agrotoxico(String nome, ClasseAgrotoxico classe) {
        this.nome = nome;
        this.classe = classe;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ClasseAgrotoxico getClasse() {
        return classe;
    }

    public void setClasse(ClasseAgrotoxico classe) {
        this.classe = classe;
    }
}
