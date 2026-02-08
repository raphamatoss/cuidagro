package com.cuidagro.server.helpers;

import com.cuidagro.server.Agrotoxico;
import com.cuidagro.server.DadosDeSaude;
import com.cuidagro.server.Doenca;
import com.cuidagro.server.Sintoma;

import java.util.ArrayList;

public class GeradorDePrompt {
    public static String gerarPrompt(ArrayList<Sintoma> sintomas, ArrayList<Agrotoxico> agrotoxicos, DadosDeSaude dadosDeSaude) {
        //inserção de altura e peso
        StringBuilder prompt = new StringBuilder("Sou trabalhador rural e tenho " + dadosDeSaude.getPeso() + "kg e " + dadosDeSaude.getAltura() + "m. ");

        // inserção de doencas se houver
        ArrayList<Doenca> doencas = dadosDeSaude.getDoencas();
        if (doencas != null) {
            prompt.append("Tenho as seguintes doenças: ");
            for (int i = 0; i < doencas.size(); i++) {
                if (i == doencas.size()-1) {
                    prompt.append(doencas.get(i).getNome()).append(". ");
                }
                else {
                    prompt.append(doencas.get(i).getNome()).append(", ");
                }
            }
        }

        // inserção de agrotoxicos
        if (agrotoxicos != null) {
            prompt.append("Trabalho com os seguintes agrotóxicos: ");
            for (int i = 0; i < agrotoxicos.size(); i++) {
                if (i == agrotoxicos.size()-1) {
                    prompt.append(agrotoxicos.get(i).getNome()).append(". ");
                }
                else {
                    prompt.append(agrotoxicos.get(i).getNome()).append(", ");
                }
            }
        }

        // inserção de sintomas {
        if (sintomas != null) {
            prompt.append("Tenho sentido os seguintes sintomas: ");
            for (int i = 0; i < sintomas.size(); i++) {
                if (i == sintomas.size()-1) {
                    prompt.append(sintomas.get(i).getSintoma()).append(". ");
                }
                else {
                    prompt.append(sintomas.get(i).getSintoma()).append(", ");
                }
            }
        }

        prompt.append("Considerando minha situação, gere um diagnóstico parcial. Retorne os dados como um JSON (e nada mais) " +
                "no formato (Diagnostico: nome; CID: cid; Risco: grau; Descrição: descrição do diagnóstico em até 3 linhas) " +
                "sendo risco um dos valores a seguir: MUITO_BAIXO, BAIXO, MEDIO, ALTO, MUITO_ALTO.");

        return prompt.toString();
    }
}
