package com.cuidagro.server.APIControllers;

import com.cuidagro.server.DBCommunication.DBDadosDeSaude;
import com.cuidagro.server.DBCommunication.DBDoenca;
import com.cuidagro.server.DadosDeSaude;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/minha-saude")
public class DadosDeSaudeController {
    @GetMapping()
    public String getDoencas() {
        return Serializacao.serializarArrayList(DBDoenca.getAll());
    }

    @PostMapping(value="/forms")
    public ResponseEntity inserirDados(@RequestBody DadosDeSaude dados) {
        if (DBDadosDeSaude.persistirDados(dados)) return ResponseEntity.ok().build();
        else return ResponseEntity.badRequest().build();
    }
}
