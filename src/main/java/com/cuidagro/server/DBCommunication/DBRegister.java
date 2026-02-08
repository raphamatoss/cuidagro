package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Medico;
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
            String papel = usuario.getPapel().toString();
            Timestamp timestamp = Timestamp.valueOf(data.atStartOfDay());

            String sql = "INSERT INTO mydb." + papel + " (cpf, nome, datanascimento, email, numero, senha_hash, papel)" +
                        " VALUES (?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, cpf);
            preparedStatement.setString(2, nome);
            preparedStatement.setTimestamp(3, timestamp);
            preparedStatement.setString(4, email);
            preparedStatement.setString(5, numero);
            preparedStatement.setString(6, senha);
            preparedStatement.setString(7, papel);

            preparedStatement.executeUpdate();
            return true;
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
            return false;
        }
    }

    public static boolean persistirMedico(Medico medico) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();
            String cpf = medico.getCpf();
            String nome = medico.getNome();
            String email = medico.getEmail();
            String senha = medico.getSenha();
            String numero = medico.getNumero();
            String crm = medico.getCrm();
            String especialidade = medico.getEspecialidade().toString();
            LocalDate data = medico.getDataNascimento();
            String papel = medico.getPapel().toString();
            Timestamp timestamp = Timestamp.valueOf(data.atStartOfDay());

            String sql = "INSERT INTO mydb." + papel + " (cpf, nome, datanascimento, email, numero, senha_hash, crm, especialidade, papel)" +
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1, cpf);
            preparedStatement.setString(2, nome);
            preparedStatement.setTimestamp(3, timestamp);
            preparedStatement.setString(4, email);
            preparedStatement.setString(5, numero);
            preparedStatement.setString(6, senha);
            preparedStatement.setString(7, crm);
            preparedStatement.setString(8, especialidade);
            preparedStatement.setString(9, papel);

            preparedStatement.executeUpdate();
            return true;
        }
        catch (Exception e) {
            System.out.println("Erro ao estabelecer conexão com o banco de dados: " + e.getMessage());
            return false;
        }
    }
}
