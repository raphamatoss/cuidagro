package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agrotoxico;
import com.cuidagro.server.enums.ClasseAgrotoxico;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
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
            e.printStackTrace();
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
            e.printStackTrace();
        }
        throw new RuntimeException("Erro ao buscar agrotoxicos no banco de dados.");
    }

}
