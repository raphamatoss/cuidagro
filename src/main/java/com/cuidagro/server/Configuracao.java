package com.cuidagro.server;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Configuracao {
    public static Properties p = null;

    public static void carregarConfig() {
        try (InputStream is = Configuracao.class
                .getClassLoader()
                .getResourceAsStream("application.properties")) {

            if (is == null) {
                throw new RuntimeException("application.properties não encontrado no classpath");
            }

            p = new Properties();
            p.load(is);

        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar application.properties", e);
        }
    }

    public static String get(String key) {
        return p.getProperty(key);
    }
}
