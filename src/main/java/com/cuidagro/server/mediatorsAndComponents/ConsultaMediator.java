package com.cuidagro.server.mediatorsAndComponents;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Consulta;
import com.cuidagro.server.Medico;
import com.cuidagro.server.helpers.Local;

import java.time.LocalDateTime;

public class ConsultaMediator implements Mediator {
    /**
     * Implementação do padrão de projeto Mediador. Veja mais em: https://refactoring.guru/design-patterns/mediator
     */
    private Agricultor agricultor;
    private Medico medico;
    private LocalDateTime dataHora;
    private Local local;

    @Override
    public void signal(Component componente, String evento) {

    }
//
//    public void agricultor() {
//        agricultor()
//    }

}
