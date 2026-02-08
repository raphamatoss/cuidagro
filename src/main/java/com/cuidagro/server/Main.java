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
        Configuracao.carregarConfig();
        DBConnection.addParametros(Configuracao.get("db_url"), Configuracao.get("db_user"), Configuracao.get("db_pass"));

//        ArrayList<Sintoma> sintomas = new ArrayList<>();
//        sintomas.add(new Sintoma("Tosse"));
//        ArrayList<Agrotoxico> agrotoxicos = new ArrayList<>();
//        agrotoxicos.add(new Agrotoxico("Glisosfato", ClasseAgrotoxico.ALTAMENTE_TOXICO));
//        DadosDeSaude dados = new DadosDeSaude(83.3F, 1.81F, null);
//        System.out.println(GeminiAPI.gerarDiagnosticoParcial(GeradorDePrompt.gerarPrompt(sintomas, agrotoxicos, dados)));
    }
}
