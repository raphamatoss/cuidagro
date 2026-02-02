package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agrotoxico;
import com.cuidagro.server.AgrotoxicoForms;
import com.cuidagro.server.enums.ClasseAgrotoxico;

import java.io.PrintStream;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;

public class DBAgrotoxicos {
    public static ArrayList<Agrotoxico> getAll () {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.agrotoxico";
            Statement statement = con.createStatement();
            try (ResultSet set = statement.executeQuery(sql)) {
                ArrayList<Agrotoxico> agrotoxicos = new ArrayList<>();
                while (set.next()) {
                    String nome = set.getString("nome");
                    String classe = set.getString("classe");
                    agrotoxicos.add(new Agrotoxico(nome, ClasseAgrotoxico.valueOf(classe)));
                }
                statement.close();
                return agrotoxicos;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
        throw new RuntimeException("Erro ao buscar agrotoxicos no banco de dados.");
    }

    public static ArrayList<Agrotoxico> getByClass(String classe) {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.agrotoxico a where a.classe = ?";
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, classe);
            try (ResultSet set = preparedStatement.executeQuery()) {
                ArrayList<Agrotoxico> agrotoxicos = new ArrayList<>();
                while (set.next()) {
                    String nome = set.getString("nome");
                    String classe_db = set.getString("classe");
                    agrotoxicos.add(new Agrotoxico(nome, ClasseAgrotoxico.valueOf(classe_db)));
                }
                preparedStatement.close();
                return agrotoxicos;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
        throw new RuntimeException("Erro ao buscar agrotoxicos no banco de dados.");
    }

    public static void persistirForms(AgrotoxicoForms forms) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();
            String user_cpf = forms.getCPF();
            LocalDateTime data = forms.getData();
            ZoneId zone = ZoneId.of("America/Sao_Paulo");
            Timestamp timestamp = Timestamp.from(data.atZone(zone).toInstant());
            Agrotoxico[] agrotoxicos = forms.getAgrotoxicos();
            con.setAutoCommit(false);
            for (Agrotoxico a : agrotoxicos) {
                String sql = "INSERT INTO mydb.agricultor_has_agrotoxico (agricultor_cpf, agrotoxico_nome, dataformulario)" +
                        " VALUES (?, ?, ?)";
                PreparedStatement preparedStatement = con.prepareStatement(sql);
                preparedStatement.setString(1, user_cpf);
                preparedStatement.setString(2, a.getNome());
                preparedStatement.setTimestamp(3, timestamp);

                preparedStatement.executeUpdate();
            }
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
