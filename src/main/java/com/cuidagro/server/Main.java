package com.cuidagro.server;

import com.cuidagro.server.DBCommunication.DBConnection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Properties;

@SpringBootApplication
public class Main {
    //A função main espera que o arquivo "config.properties" exista para que a classe Configuração.java consiga
    // obter as informações dele e carregar corretamente os parametros do banco de dados.
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);

        //Configurando o acesso ao banco de dados
        Properties dbConfig = Configuracao.getConfig();
        String jdbc_url = "jdbc:postgresql://" + dbConfig.getProperty("db_url") + ":"
        + dbConfig.getProperty("db_port") + "/" + dbConfig.getProperty("db_database");
        DBConnection.addParametros(jdbc_url, dbConfig.getProperty("db_user"), dbConfig.getProperty("db_pass"));
    }
}
