package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Usuario;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.net.UnknownServiceException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;

public class DBLogin {
    public static Usuario login (String cpf) {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.agricultor a where a.cpf = ?";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, cpf);
            try (ResultSet set = preparedStatement.executeQuery()) {
                if (set.next()) {
                    String nome = set.getString("nome");
                    String email = set.getString("email");
                    String numero = set.getString("numero");
                    LocalDate nascimento = set.getDate("dataNascimento").toLocalDate();

                    preparedStatement.close();
                    return new Agricultor(nome, cpf, nascimento, email, numero);
                }
                else {
                    throw new RuntimeException("Usuário não encontrado.");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        throw new RuntimeException("Erro ao realizar login.");
    }
}
