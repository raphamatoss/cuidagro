package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class DBRegister {
    public static boolean persistirUsuario(Usuario usuario) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();
            String cpf = usuario.getCpf();
            String nome = usuario.getNome();
            String email = usuario.getEmail();
            String senha = usuario.getSenha();
            String numero = usuario.getNumero();
            LocalDate data = usuario.getDataNascimento();
            String papel = usuario.getPapel();
            Timestamp timestamp = Timestamp.valueOf(data.atStartOfDay());

            String sql = "INSERT INTO mydb." + papel + " (cpf, nome, datanascimento, email, numero, senha_hash)" +
                        " VALUES (?, ?, ?, ?, ?, ?)";
            System.out.println(sql);
            System.out.println(cpf + " " + nome + " " + email + " " + senha);
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, cpf);
            preparedStatement.setString(2, nome);
            preparedStatement.setTimestamp(3, timestamp);
            preparedStatement.setString(4, email);
            preparedStatement.setString(5, numero);
            preparedStatement.setString(6, senha);

            preparedStatement.executeUpdate();
            return true;
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
            return false;
        }
    }
}
