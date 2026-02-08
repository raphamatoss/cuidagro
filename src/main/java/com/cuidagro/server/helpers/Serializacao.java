package com.cuidagro.server.helpers;

import com.cuidagro.server.Agrotoxico;
import com.cuidagro.server.Alerta;
import com.cuidagro.server.Usuario;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Serializacao {
    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public static String serializarAgrotoxico(Agrotoxico agrotoxico) {
        JsonObject obj = new JsonObject();
        obj.addProperty("nome", agrotoxico.getNome());
        obj.addProperty("classe", agrotoxico.getClasse().toString());

        return gson.toJson(obj);
    }

    public static String serializarUsuario(Usuario user) {
        JsonObject obj = new JsonObject();
        obj.addProperty("nome", user.getNome());
        obj.addProperty("cpf", user.getCpf());
        obj.addProperty("idade", user.getIdade());
        obj.addProperty("email", user.getEmail());
        obj.addProperty("numero", user.getNumero());

        return gson.toJson(obj);
    }

    public static String serializarAlerta(Alerta alerta) {
        JsonObject obj = new JsonObject();
        obj.addProperty("risco", alerta.getRisco().toString());
        obj.addProperty("status", alerta.getStatus().toString());
        obj.addProperty("agricultor_cpf", alerta.getAgricultor().getCpf());
        obj.addProperty("data", alerta.getDataDeRegistro().toString());

        return gson.toJson(obj);
    }

    public static <T> String serializarArrayList(ArrayList<T> arrayList) {
        return gson.toJson(arrayList);
    }
}
