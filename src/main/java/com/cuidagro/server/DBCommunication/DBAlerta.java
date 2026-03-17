package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Alerta;
import com.cuidagro.server.enums.Risco;
import com.cuidagro.server.enums.StatusAlerta;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class DBAlerta {

    public static void persistirAlerta(Alerta alerta) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();

            String sql = "INSERT INTO mydb.alerta (status, diagnostico_id, agricultor_cpf, dataemissao, risco) VALUES " +
                    "(?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, alerta.getStatus().toString());
            preparedStatement.setInt(2, 0); //Coloquei 0 aqui pq eu não sei o que fazer com a falta do ID
            preparedStatement.setString(3, alerta.getAgricultor().getCpf());
            preparedStatement.setTimestamp(4, Timestamp.valueOf(alerta.getDataDeRegistro()));
            preparedStatement.setString(5, alerta.getRisco().toString());

            preparedStatement.executeUpdate();
            System.out.println("Alerta salvo no banco com sucesso!");

        } catch (Exception e) {
            System.out.println("Erro ao salvar alerta: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static ArrayList<Alerta> getAll () {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.alerta";
            Statement statement = con.createStatement();
            try (ResultSet set = statement.executeQuery(sql)) {
                ArrayList<Alerta> alertas = new ArrayList<>();
                while (set.next()) {
                    Timestamp timestamp = set.getTimestamp("dataemissao");
                    LocalDateTime data_emissao = (timestamp != null) ? timestamp.toLocalDateTime() : null;
                    StatusAlerta status = StatusAlerta.valueOf(set.getString("status"));
                    Risco risco = Risco.valueOf(set.getString("risco"));
                    String agricultor_cpf = set.getString("agricultor_cpf");
                    //Solução temporária: Vamos pegar o resto dos dados do agricultor utilizando join no BD.
                    Agricultor agricultor = new Agricultor("Nome Pendente", agricultor_cpf, null, "email@placeholder.com", "00000000");
                    alertas.add(new Alerta(data_emissao, status, risco, agricultor));
                }
                statement.close();
                return alertas;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
        throw new RuntimeException("Erro ao buscar alertas no banco de dados.");
    }

    public static ArrayList<Alerta> getByRisco(String risco) {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.alerta a where a.risco = ?";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, risco);
            try (ResultSet set = preparedStatement.executeQuery()) {
                ArrayList<Alerta>  alertas = new ArrayList<>();
                while (set.next()) {
                    Timestamp timestamp = set.getTimestamp("dataemissao");
                    LocalDateTime data_emissao = (timestamp != null) ? timestamp.toLocalDateTime() : null;
                    StatusAlerta status = StatusAlerta.valueOf(set.getString("status"));
                    Risco riscoEnum = Risco.valueOf(set.getString("risco"));
                    String agricultor_cpf = set.getString("agricultor_cpf");
                    //Solução temporária: Vamos pegar o resto dos dados do agricultor utilizando join no BD.
                    Agricultor agricultor = new Agricultor("Nome Pendente", agricultor_cpf, null, "email@placeholder.com", "00000000");
                    alertas.add(new Alerta(data_emissao, status, riscoEnum, agricultor));
                }
                preparedStatement.close();
                return alertas;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
        throw new RuntimeException("Erro ao buscar agrotoxicos no banco de dados.");
    }
}