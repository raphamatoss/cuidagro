package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.AgenteDeSaude;
import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Medico;
import com.cuidagro.server.Usuario;
import com.cuidagro.server.enums.Especialidade;
import com.cuidagro.server.enums.PapelUsuario;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.net.UnknownServiceException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;

public class DBLogin {
    public static Usuario login (String email) {
        try (Connection con = DBConnection.getConnection()) { // primeiro checa se o usuario é agente de saúde
            String sql = "select * from mydb.agente_de_saude a where a.email = ?";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, email);
            try (ResultSet set = preparedStatement.executeQuery()) {
                if (set.next()) {
                    String nome = set.getString("nome");
                    String cpf = set.getString("cpf");
                    String numero = set.getString("numero");
                    String senha = set.getString("senha_hash");
                    LocalDate nascimento = set.getDate("dataNascimento").toLocalDate();
                    String papel = set.getString("papel");

                    preparedStatement.close();
                    return new AgenteDeSaude(nome, cpf, nascimento, email, numero, senha, PapelUsuario.valueOf(papel));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        try (Connection con = DBConnection.getConnection()) { // depois checa se é médico
            String sql = "select * from mydb.medico a where a.email = ?";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, email);
            try (ResultSet set = preparedStatement.executeQuery()) {
                if (set.next()) {
                    String nome = set.getString("nome");
                    String cpf = set.getString("cpf");
                    String numero = set.getString("numero");
                    String senha = set.getString("senha_hash");
                    LocalDate nascimento = set.getDate("dataNascimento").toLocalDate();
                    String papel = set.getString("papel");
                    String crm = set.getString("crm");
                    String especialidade = set.getString("especialidade");

                    preparedStatement.close();
                    return new Medico(nome, cpf, nascimento, crm, Especialidade.valueOf(especialidade), email, numero, senha, PapelUsuario.valueOf(papel));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        try (Connection con = DBConnection.getConnection()) { // e por fim se é agricultor
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
                    String papel = set.getString("papel");

                    preparedStatement.close();
                    return new Agricultor(nome, cpf, nascimento, email, numero, senha, PapelUsuario.valueOf(papel));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
