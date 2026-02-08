package com.cuidagro.server.observerAndSubjects;

import com.cuidagro.server.Alerta;
import com.cuidagro.server.DBCommunication.DBAlerta;

public class AlertaDBObserver implements Observer {

    @Override
    public void atualizar(Alerta alerta) {

        System.out.println(">>> [Observer] Recebi um alerta do Agricultor: " + alerta.getAgricultor().getCpf());

        DBAlerta.persistirAlerta(alerta);
    }
}