package com.cuidagro.server.helpers;

import com.cuidagro.server.Consulta;
import com.cuidagro.server.helpers.Endereco;
import com.cuidagro.server.helpers.Local;
import com.google.gson.JsonObject;

public class MontadorJson {

    public static JsonObject montarConsulta(Consulta consulta) {
        JsonObject json = new JsonObject();

        // Dados simples
        if (consulta.getDiaHora() != null) {
            json.addProperty("diaHora", consulta.getDiaHora().toString());
        }
        if (consulta.getStatus() != null) {
            json.addProperty("status", consulta.getStatus().toString());
        }

        // Dados do médico: Só nome e CPF
        if (consulta.getMedico() != null) {
            JsonObject jsonMedico = new JsonObject();
            jsonMedico.addProperty("nome", consulta.getMedico().getNome());
            jsonMedico.addProperty("cpf", consulta.getMedico().getCpf());
            // Se tiver CRM, adiciona também
            if (consulta.getMedico().getCrm() != null) {
                jsonMedico.addProperty("crm", consulta.getMedico().getCrm());
            }
            json.add("medico", jsonMedico);
        }

        if (consulta.getLocal() != null) {
            json.add("local", montarLocal(consulta.getLocal()));
        }

        // Agricultor (Apenas CPF para evitar loop)
        if (consulta.getAgricultor() != null) {
            json.addProperty("agricultor_cpf", consulta.getAgricultor().getCpf());
        }

        return json;
    }

    public static JsonObject montarLocal(Local local) {
        JsonObject json = new JsonObject();
        if (local.getPredio() != null) json.addProperty("predio", local.getPredio());
        if (local.getSetor() != null) json.addProperty("setor", local.getSetor());
        if (local.getSala() != null) json.addProperty("sala", local.getSala());

        if (local.getEndereco() != null) {
            json.add("endereco", montarEndereco(local.getEndereco()));
        }
        return json;
    }

    public static JsonObject montarEndereco(Endereco endereco) {
        JsonObject json = new JsonObject();
        json.addProperty("rua", endereco.getRua());
        json.addProperty("numero", endereco.getNumero());
        json.addProperty("bairro", endereco.getBairro());
        json.addProperty("cidade", endereco.getCidade());
        if (endereco.getEstado() != null) {
            json.addProperty("estado", endereco.getEstado().toString());
        }
        json.addProperty("cep", endereco.getCep());
        json.addProperty("complemento", endereco.getComplemento());
        return json;
    }
}