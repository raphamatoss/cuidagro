package com.cuidagro.server.observerAndSubjects;

import com.cuidagro.server.Alerta;

public interface Observer {
    void atualizar(Alerta alerta);

}