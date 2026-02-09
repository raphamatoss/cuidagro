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

    public Agricultor getAgricultor() {
        return agricultor;
    }

    public void setAgricultor(Agricultor agricultor) {
        this.agricultor = agricultor;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    @Override
    public void signal(Component componente, String evento) {
        if (evento.equalsIgnoreCase("AGENDAR")) {
            agendarConsulta();
        } else if (evento.equalsIgnoreCase("CANCELAR")) {
            cancelarConsulta();
        }
    }

    private void agendarConsulta() {
        // Validação dos dados:
        if (agricultor == null || medico == null || dataHora == null || local == null) {
            System.out.println(">> ERRO: Dados incompletos para agendar a consulta.");
            return;
        }

        // Caso esteja tudo preenchido. Criar nova consulta.
        Consulta novaConsulta = new Consulta(dataHora, local, medico, agricultor);

        // Salvamento no histórico do agricultor:
        if (agricultor.getHistorico() != null) {
            agricultor.getHistorico().addConsulta(novaConsulta);
            System.out.println(">> SUCESSO: Consulta agendada para " + agricultor.getNome() +
                    " com Dr(a). " + medico.getNome() + " em " + dataHora);
        } else {
            System.out.println(">> ERRO: O agricultor não possui um histórico inicializado.");
        }
    }

    private void cancelarConsulta() {
        if (agricultor == null || agricultor.getHistorico() == null) {
            System.out.println(">> ERRO: Não é possível cancelar (Agricultor ou Histórico inexistente).");
            return;
        }

        // Pra procurar a consulta original
        Consulta consultaAlvo = null;

        for (Consulta c : agricultor.getHistorico().getConsultas()) {
            // Verificar se é o mesmo médico e se a dia/hora estão ok.
            if (c.getMedico().equals(this.medico) && c.getDiaHora().equals(this.dataHora)) {
                consultaAlvo = c;
                break;
            }
        }

        if (consultaAlvo != null) {
            agricultor.getHistorico().cancelConsulta(consultaAlvo);
            System.out.println(">> SUCESSO: Cancelamento solicitado.");
        } else {
            System.out.println(">> ERRO: Consulta inexistente. Impossível cancelar.");
        }
    }
}
