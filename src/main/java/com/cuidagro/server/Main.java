package com.cuidagro.server;

import com.cuidagro.server.DBCommunication.DBConnection;
import com.cuidagro.server.DBCommunication.DBConsulta;
import com.cuidagro.server.enums.StatusConsulta;
import com.cuidagro.server.enums.UnidadeFederativa;
import com.cuidagro.server.helpers.Endereco;
import com.cuidagro.server.helpers.Local;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Properties;

@SpringBootApplication
public class Main {
    //A função main espera que o arquivo "aplication.properties" exista para que a classe Configuração.java consiga
    // obter as informações dele e carregar corretamente os parametros do banco de dados.
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);

        //Configurando o acesso ao banco de dados
        Configuracao.carregarConfig();
        DBConnection.addParametros(Configuracao.get("db_url"), Configuracao.get("db_user"), Configuracao.get("db_pass"));
    }
}
