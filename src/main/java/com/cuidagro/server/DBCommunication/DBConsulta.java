package com.cuidagro.server.DBCommunication;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.Consulta;
import com.cuidagro.server.Medico;
import com.cuidagro.server.enums.StatusConsulta;
import com.cuidagro.server.enums.UnidadeFederativa;
import com.cuidagro.server.helpers.Endereco;
import com.cuidagro.server.helpers.Local;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class DBConsulta {

    //Segue o princípio tudo ou nada: ou salva os dados direito ou não salva nada.
    public static boolean salvar(Consulta consulta) {
        Connection con = null;
        try {
            con = DBConnection.getConnection();
            con.setAutoCommit(false); // (Modo seguro)

            // Salva o Local (que internamente já deve salvar o Endereço)
            // Passamos a conexão 'con' para manter tudo na mesma transação
            int localId = DBLocal.salvar(consulta.getLocal(), con);

            String sql = "INSERT INTO mydb.consulta (data, status, medico_cpf, agricultor_cpf, local_id) " +
                    "VALUES (?, ?, ?, ?, ?)";

            try (PreparedStatement preparedStatement = con.prepareStatement(sql)) {
                preparedStatement.setTimestamp(1, Timestamp.valueOf(consulta.getDiaHora()));
                preparedStatement.setString(2, consulta.getStatus().toString());
                preparedStatement.setString(3, consulta.getMedico().getCpf());
                preparedStatement.setString(4, consulta.getAgricultor().getCpf());
                preparedStatement.setInt(5, localId);

                preparedStatement.executeUpdate();
            }

            con.commit(); // Confirmação da operação
            System.out.println("Consulta salva com sucesso (incluindo Local e Endereço)!");
            return true;

        } catch (Exception e) {
            // Em caso de erro: faz um rollback (cancela tudo o que foi feito).
            if (con != null) {
                try {
                    con.rollback();
                    System.out.println("Rollback executado! Alterações canceladas.");
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
            System.out.println("Erro crítico ao salvar consulta: " + e.getMessage());
            e.printStackTrace();
            return false;
        } finally {
            // Restaura o comportamento padrão da conexão e fecha
            if (con != null) {
                try {
                    con.setAutoCommit(true);
                    con.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }


     // Busca o histórico completo, montando os objetos de Local e Endereço.
    public static ArrayList<Consulta> getHistoricoPorCpf(String cpfAgricultor) {
        ArrayList<Consulta> consultas = new ArrayList<>();

        // Consulta composta: Traz Consulta + Médico + Local + Endereço de acordo com o cpf do agricultor
        String sql = "SELECT c.data, c.status, " +
                "m.nome as medico_nome, m.cpf as medico_cpf, m.datanascimento as medico_nasc, " +
                "a.datanascimento as agricultor_nasc, " + // <--- NOVO CAMPO
                "l.predio, l.setor, l.sala, " +
                "e.rua, e.numero, e.bairro, e.cidade, e.estado, e.cep, e.complemento " +
                "FROM mydb.consulta c " +
                "JOIN mydb.medico m ON c.medico_cpf = m.cpf " +
                "JOIN mydb.agricultor a ON c.agricultor_cpf = a.cpf " + // <--- NOVO JOIN
                "JOIN mydb.local l ON c.local_id = l.id " +
                "JOIN mydb.endereco e ON l.endereco_id = e.id " +
                "WHERE c.agricultor_cpf = ? " +
                "ORDER BY c.data DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement preparedStatement = con.prepareStatement(sql)) {

            preparedStatement.setString(1, cpfAgricultor);

            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    // Dados Básicos da Consulta
                    LocalDateTime dataHora = rs.getTimestamp("data").toLocalDateTime();
                    String statusStr = rs.getString("status");
                    StatusConsulta status = (statusStr != null) ? StatusConsulta.valueOf(statusStr) : StatusConsulta.PENDENTE;

                    // Reconstrói o Médico
                    java.sql.Date dataSql = rs.getDate("medico_nasc");
                    java.time.LocalDate dataNascMedico = (dataSql != null) ? dataSql.toLocalDate() : null;
                    Medico medico = new Medico(rs.getString("medico_nome"), rs.getString("medico_cpf"), dataNascMedico, null, null);

                    // Reconstrói o Endereço
                    Endereco endereco = new Endereco();
                    endereco.setRua(rs.getString("rua"));
                    endereco.setNumero(rs.getInt("numero"));
                    endereco.setBairro(rs.getString("bairro"));
                    endereco.setCidade(rs.getString("cidade"));
                    endereco.setCep(rs.getInt("cep"));
                    endereco.setComplemento(rs.getString("complemento"));
                    // Tenta converter a String do banco para o Enum UnidadeFederativa
                    try {
                        endereco.setEstado(UnidadeFederativa.valueOf(rs.getString("estado")));
                    } catch (Exception ignored) { }

                    // Reconstrói o Local
                    Local local = new Local(endereco);
                    local.setPredio(rs.getString("predio"));
                    local.setSetor(rs.getString("setor"));
                    local.setSala(rs.getString("sala"));

                    // Reconstrói o Agricultor (Referência)
                    java.sql.Date dataSqlAgri = rs.getDate("medico_nasc");
                    java.time.LocalDate dataNascAgricultor = (dataSql != null) ? dataSqlAgri.toLocalDate() : null;
                    Agricultor agricultorRef = new Agricultor(null, cpfAgricultor, dataNascAgricultor, null,null);

                    // Monta a Consulta Final
                    Consulta c = new Consulta(dataHora, local, medico, agricultorRef);
                    c.setStatus(status);

                    consultas.add(c);
                }
            }
        } catch (Exception e) {
            System.out.println("Erro ao buscar histórico detalhado: " + e.getMessage());
            e.printStackTrace();
        }
        return consultas;
    }


     // Atualiza o status da consulta (Ex: Cancelamento).
    public static boolean atualizarStatus(Consulta consulta) {
        String sql = "UPDATE mydb.consulta SET status = ? WHERE data = ? AND medico_cpf = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement preparedStatement = con.prepareStatement(sql)) {

            preparedStatement.setString(1, consulta.getStatus().toString());
            preparedStatement.setTimestamp(2, Timestamp.valueOf(consulta.getDiaHora()));
            preparedStatement.setString(3, consulta.getMedico().getCpf());

            return preparedStatement.executeUpdate() > 0;

        } catch (Exception e) {
            System.out.println("Erro ao atualizar status: " + e.getMessage());
            return false;
        }
    }
}