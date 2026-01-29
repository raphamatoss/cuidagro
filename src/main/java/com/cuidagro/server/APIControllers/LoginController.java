package com.cuidagro.server.APIControllers;
import com.cuidagro.server.DBCommunication.DBLogin;
import com.cuidagro.server.Usuario;
import com.cuidagro.server.helpers.SerializacaoUsuario;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @GetMapping("/login")
    public String login(@RequestParam("cpf") String cpf) {
        Usuario user = DBLogin.login(cpf);

        return SerializacaoUsuario.serializar(user);
    }
}
