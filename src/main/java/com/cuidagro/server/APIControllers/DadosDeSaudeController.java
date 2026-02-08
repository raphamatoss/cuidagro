package com.cuidagro.server.APIControllers;

import com.cuidagro.server.DBCommunication.DBDadosDeSaude;
import com.cuidagro.server.DadosDeSaude;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/minha-saude")
public class DadosDeSaudeController {
    @PostMapping(value="/forms")
    public ResponseEntity inserirDados(@RequestBody DadosDeSaude dados) {
        if (DBDadosDeSaude.persistirDados(dados)) return ResponseEntity.ok().build();
        else return ResponseEntity.badRequest().build();
    }
}
