package com.cuidagro.server.Servicos;

import com.cuidagro.server.DBCommunication.DBRegister;
import com.cuidagro.server.Usuario;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServicoUsuario {

    private static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public static Boolean registrar (Usuario usuario) {
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        return DBRegister.persistirUsuario(usuario);
    }
}
