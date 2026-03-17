package com.cuidagro.server;

import com.cuidagro.server.enums.StatusConsulta;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

public class Historico {
    private ArrayList<Consulta> consultas;
    private ArrayList<Diagnostico> diagnosticos;
    private HashMap<LocalDate, ArrayList<Consulta>> dataConsultaHash;

    public Historico() {
        consultas = new ArrayList<Consulta>();
        diagnosticos = new ArrayList<Diagnostico>();
        dataConsultaHash = new HashMap<LocalDate, ArrayList<Consulta>>();
    }

    public void addConsulta(Consulta consulta) {
        consultas.add(consulta);

        // Validação se data/hora for nulo.
        if (consulta.getDiaHora() != null) {
            LocalDate data = consulta.getDiaHora().toLocalDate();

            if (!dataConsultaHash.containsKey(data)) {
                ArrayList<Consulta> arrayList = new ArrayList<>();
                arrayList.add(consulta);
                dataConsultaHash.put(data, arrayList);
            } else {
                // É por referência, então basta dar o get e adicionar
                dataConsultaHash.get(data).add(consulta);
            }
        }
    }

    public void cancelConsulta(Consulta consulta) {
        if(!consultas.contains(consulta)){
            System.out.println("ERRO: Consulta não encontrada no histórico");
            return;
        }
        consulta.setStatus(StatusConsulta.CANCELADA);
    }

    public void addDiagnostico(Diagnostico diagnostico) {
        diagnosticos.add(diagnostico);
    }

    // retorna uma arraylist de consultas de uma determinada data
    public ArrayList<Consulta> getConsultaByDate(LocalDate data) {
        return dataConsultaHash.get(data);
    }

    public ArrayList<Consulta> getConsultas() {
        return consultas;
    }

    public ArrayList<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }
}
