package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agrotoxico;
import com.cuidagro.server.Sintoma;
import com.cuidagro.server.SintomaForms;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;

public class DBSintomas {
    public static ArrayList<Sintoma> getAll () {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.sintoma";
            Statement statement = con.createStatement();
            try (ResultSet set = statement.executeQuery(sql)) {
                ArrayList<Sintoma> sintomas = new ArrayList<>();
                while (set.next()) {
                    String sintoma = set.getString("sintoma");
                    sintomas.add(new Sintoma(sintoma));
                }
                statement.close();
                return sintomas;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
        throw new RuntimeException("Erro ao buscar sintomas no banco de dados.");
    }

    public static void persistirForms(SintomaForms forms) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();
            String user_cpf = forms.getCPF();
            LocalDateTime data = forms.getData();
            ZoneId zone = ZoneId.of("America/Sao_Paulo");
            Timestamp timestamp = Timestamp.from(data.atZone(zone).toInstant());
            Sintoma[] sintomas = forms.getSintomas();
            System.out.println(user_cpf + " " + data + " " + sintomas.length);
            con.setAutoCommit(false);

            // insert do relato: data e cpf do agricultor -> retorna id do relato
            String sql_relatos = "INSERT INTO mydb.relato_de_sintoma (dataemissao, agricultor_cpf)" +
                    " VALUES (?, ?) RETURNING id";

            PreparedStatement preparedStatement_relatos = con.prepareStatement(sql_relatos);
            preparedStatement_relatos.setTimestamp(1, timestamp);
            preparedStatement_relatos.setString(2, user_cpf);

            int id = 0;
            try (ResultSet set = preparedStatement_relatos.executeQuery()) {
                if (set.next()) {
                    id = set.getInt("id");
                }
            }
            catch (Exception e) {
                throw new RuntimeException("Erro ao adicionar relato." + e.getMessage());
            }

            // insert dos sintomas associados ao id do relato
            String sql_sintomas_relatos = "INSERT INTO mydb.sintoma_has_relato_de_sintoma " +
                    "(sintoma_id, relato_de_sintoma_id) VALUES (?, ?)";
            PreparedStatement preparedStatement_sintomas_relatos = con.prepareStatement(sql_sintomas_relatos);
            for (Sintoma s : sintomas) {
                preparedStatement_sintomas_relatos.setString(1, s.getSintoma());
                preparedStatement_sintomas_relatos.setInt(2, id);

                preparedStatement_sintomas_relatos.addBatch();
            }
            preparedStatement_sintomas_relatos.executeBatch();

            con.commit();
            con.setAutoCommit(true);
        }
        catch (Exception e) {
            if (con != null) {
                try {
                    con.rollback();
                    System.out.println("Rollback executado!");
                    con.setAutoCommit(true);
                }
                catch (SQLException ex) {
                    System.out.println(ex.getMessage());
                }
            }
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
    }
}
