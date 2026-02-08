package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.DadosDeSaude;
import com.cuidagro.server.Doenca;

import java.sql.*;
import java.util.ArrayList;

public class DBDadosDeSaude {
    public static boolean persistirDados(DadosDeSaude dados) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();

            Float peso = dados.getPeso();
            Float altura = dados.getAltura();
            String cpf = dados.getCpf_agricultor();
            ArrayList<Doenca> doencas = dados.getDoencas();

            con.setAutoCommit(false);

            // insert do relato: data e cpf do agricultor -> retorna id do relato
            String sql_dados = "INSERT INTO mydb.dados_de_saude (peso, altura, agricultor_cpf)" +
                    " VALUES (?, ?, ?) RETURNING id";

            PreparedStatement preparedStatement_dados = con.prepareStatement(sql_dados);
            preparedStatement_dados.setFloat(1, peso);
            preparedStatement_dados.setFloat(2, altura);
            preparedStatement_dados.setString(3, cpf);

            int id = 0;
            try (ResultSet set = preparedStatement_dados.executeQuery()) {
                if (set.next()) {
                    id = set.getInt("id");
                }
            }
            catch (Exception e) {
                throw new RuntimeException("Erro ao adicionar dados de saude." + e.getMessage());
            }

            if (doencas != null) {
                // insert dos sintomas associados ao id do relato
                String sql_dados_doencas = "INSERT INTO mydb.dados_de_saude_has_doencas " +
                        "(dados_de_saude_id, doenca_nome) VALUES (?, ?)";
                PreparedStatement preparedStatement_dados_doencas = con.prepareStatement(sql_dados_doencas);
                for (Doenca s : doencas) {
                    preparedStatement_dados_doencas.setInt(1, id);
                    preparedStatement_dados_doencas.setString(2, s.getNome());

                    preparedStatement_dados_doencas.addBatch();
                }
                preparedStatement_dados_doencas.executeBatch();
            }

            con.commit();
            con.setAutoCommit(true);
            return true;
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
        return false;
    }
}
