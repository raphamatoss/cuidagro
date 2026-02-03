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
    public static Usuario login (String email) {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.agricultor a where a.email = ?";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, email);
            try (ResultSet set = preparedStatement.executeQuery()) {
                if (set.next()) {
                    String nome = set.getString("nome");
                    String cpf = set.getString("cpf");
                    String numero = set.getString("numero");
                    String senha = set.getString("senha_hash");
                    LocalDate nascimento = set.getDate("dataNascimento").toLocalDate();

                    preparedStatement.close();
                    return new Agricultor(nome, cpf, nascimento, email, numero, senha);
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
