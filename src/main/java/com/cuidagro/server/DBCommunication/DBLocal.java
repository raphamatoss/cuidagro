package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.helpers.Local;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DBLocal {

    public static int salvar(Local local, Connection con) throws Exception {
        // Primeiro salvo o endereço dentro da mesma transação
        int enderecoId = DBEndereco.salvar(local.getEndereco(), con);

        // Depois salvo o local usando o ID do endereço pra usar na consulta.
        String sql = "INSERT INTO mydb.local (predio, setor, sala, endereco_id) " +
                "VALUES (?, ?, ?, ?) RETURNING id";

        try (PreparedStatement preparedStatement = con.prepareStatement(sql)) {
            preparedStatement.setString(1, local.getPredio());
            preparedStatement.setString(2, local.getSetor());
            preparedStatement.setString(3, local.getSala());
            preparedStatement.setInt(4, enderecoId);

            try (ResultSet rs = preparedStatement.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("id");
                }
            }
        }
        throw new Exception("Falha ao salvar local: ID não retornado.");
    }
}