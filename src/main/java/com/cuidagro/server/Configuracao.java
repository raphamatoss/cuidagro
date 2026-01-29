package com.cuidagro.server;

import java.io.FileInputStream;
import java.util.Properties;

public class Configuracao {
    public static final String path = "src/main/resources/MYconfig.properties";
    public static Properties p = null;

    private static void carregarConfig(String path) {
        try (FileInputStream file = new FileInputStream(path)) {
            p = new Properties();
            p.load(file);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Properties getConfig() {
        if (p == null) {
            carregarConfig(path);
        }
        return p;
    }
}
