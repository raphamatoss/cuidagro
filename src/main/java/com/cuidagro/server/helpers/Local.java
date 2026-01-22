package com.cuidagro.server.helpers;

public class Local {
    private String predio;
    private String setor;
    private String sala;
    private Endereco endereco;

    public Local(Endereco endereco) {
        this.endereco = endereco;
        predio = null;
        setor = null;
        sala = null;
    }

    public Local(Endereco endereco, String predio, String setor, String sala) {
        this.endereco = endereco;
        this.predio = predio;
        this.setor = setor;
        this.sala = sala;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(endereco.toString());

        if (hasPredio()) {
            sb.append(" - ").append(predio);
            if (hasSetor()) sb.append(", ").append(setor);
            if (hasSala()) sb.append(", ").append(sala).append(".");
        }
        else if (hasSetor()) {
            sb.append(" - ").append(setor).append(", ");
            if (hasSala()) sb.append(sala).append(".");
        }
        else if (hasSala()) {
            sb.append(" - ").append(sala).append(".");
        }

        return sb.toString();
    }

    public boolean hasPredio() {
        return predio != null;
    }

    public boolean hasSala() {
        return sala != null;
    }

    public boolean hasSetor() {
        return setor != null;
    }

    public String getPredio() {
        return predio;
    }

    public void setPredio(String predio) {
        this.predio = predio;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
}
