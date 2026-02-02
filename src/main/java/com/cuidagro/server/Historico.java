package com.cuidagro.server;

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
        LocalDate data = consulta.getDiaHora().toLocalDate();
        if (!dataConsultaHash.containsKey(data)) {
            ArrayList<Consulta> arrayList = new ArrayList<>();
            arrayList.add(consulta);
            dataConsultaHash.put(data, arrayList);
        }
        else {
            // preciso confirmar se a atribuição nesse caso é por valor ou por referência, caso seja por referência o
            // trecho "dataConsultaHash.put(data, arrayList);" é desnecessário
            ArrayList<Consulta> arrayList = dataConsultaHash.get(data);
            arrayList.add(consulta);
            dataConsultaHash.put(data, arrayList);
        }
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
