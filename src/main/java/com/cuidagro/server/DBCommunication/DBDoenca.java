package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Doenca;
import com.cuidagro.server.Sintoma;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class DBDoenca {
    public static ArrayList<Doenca> getAll () {
        try (Connection con = DBConnection.getConnection()) {
            String sql = "select * from mydb.doenca";
            Statement statement = con.createStatement();
            try (ResultSet set = statement.executeQuery(sql)) {
                ArrayList<Doenca> doencas = new ArrayList<>();
                while (set.next()) {
                    String doenca = set.getString("nome");
                    doencas.add(new Doenca(doenca));
                }
                statement.close();
                return doencas;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
        }
        throw new RuntimeException("Erro ao buscar deoncas no banco de dados.");
    }
}
