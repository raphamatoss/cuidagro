package com.cuidagro.server.APIControllers;

import com.cuidagro.server.Servicos.ServicoUsuario;
import com.cuidagro.server.Usuario;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registrar")
public class RegisterController {
    @PostMapping
    // o json com os dados do usuario espera como papel: agricultor ou agente_de_saude
    public Boolean registrar(@RequestBody Usuario usuario) {
        return ServicoUsuario.registrar(usuario);
    }
}
