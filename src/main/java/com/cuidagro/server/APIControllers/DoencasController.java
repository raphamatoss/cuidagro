package com.cuidagro.server.APIControllers;

import com.cuidagro.server.DBCommunication.DBDoenca;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doencas")
public class DoencasController {
    @GetMapping()
    public String getDoencas() {
        return Serializacao.serializarArrayList(DBDoenca.getAll());
    }
}
