package com.cuidagro.server.DBCommunication;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    private static String URL;
    private static String USER;
    private static String SENHA;

    public static void addParametros(String url, String user, String senha) {
        URL = url;
        USER = user;
        SENHA = senha;
    }

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection(URL, USER, SENHA);
    }
}
