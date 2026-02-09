package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.helpers.Endereco;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DBEndereco {

    public static int salvar(Endereco endereco, Connection con) throws Exception {
        // Usa-se RETURNING id para pegar a chave primária gerada pelo PostgreSQL
        String sql = "INSERT INTO mydb.endereco (estado, cidade, bairro, rua, cep, numero, complemento) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id";

        try (PreparedStatement preparedStatement = con.prepareStatement(sql)) {
            preparedStatement.setString(1, endereco.getEstado().toString());
            preparedStatement.setString(2, endereco.getCidade());
            preparedStatement.setString(3, endereco.getBairro());
            preparedStatement.setString(4, endereco.getRua());
            preparedStatement.setInt(5, endereco.getCep());
            preparedStatement.setInt(6, endereco.getNumero());
            preparedStatement.setString(7, endereco.getComplemento());

            try (ResultSet rs = preparedStatement.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("id");
                }
            }
        }
        throw new Exception("Falha ao salvar endereço: ID não retornado.");
    }
}