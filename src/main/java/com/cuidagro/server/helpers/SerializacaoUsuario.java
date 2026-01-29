package com.cuidagro.server.helpers;

import com.cuidagro.server.Usuario;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class SerializacaoUsuario {
    public static String serializar(Usuario user) {
        JsonObject obj = new JsonObject();
        obj.addProperty("nome", user.getNome());
        obj.addProperty("cpf", user.getCpf());
        obj.addProperty("idade", user.getIdade());
        obj.addProperty("email", user.getEmail());
        obj.addProperty("numero", user.getNumero());

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(obj);
    }

    public static Usuario deserializar(String json) {
        Usuario user = new Gson().fromJson(json, Usuario.class);
        return user;
    }
}
