package com.cuidagro.server.APIControllers;

import com.cuidagro.server.Agricultor;
import com.cuidagro.server.DBCommunication.DBDadosDeSaude;
import com.cuidagro.server.DBCommunication.DBDoenca;
import com.cuidagro.server.DBCommunication.DBLogin;
import com.cuidagro.server.DadosDeSaude;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")
public class HomeController {
    @PostMapping()
    public ResponseEntity getAgricultor(@RequestBody String cpf) {
        Agricultor agricultor = DBLogin.getAgricultor(cpf);
        if (agricultor == null) ResponseEntity.badRequest().build();
        return ResponseEntity.ok(Serializacao.serializarUsuario(agricultor));
    }
}