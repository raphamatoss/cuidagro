package com.cuidagro.server.APIControllers;

import com.cuidagro.server.Alerta;
import com.cuidagro.server.DBCommunication.DBAlerta;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/alerta")
public class AlertaController {
    @GetMapping()
    public String alertas() {
        ArrayList<Alerta> alertas = DBAlerta.getAll();
        return Serializacao.serializarArrayList(alertas);
    }

    @GetMapping(params="risco")
    public String alertaPorRisco(@RequestParam("risco") String risco) {
        ArrayList<Alerta> alertas = DBAlerta.getByRisco(risco);
        return Serializacao.serializarArrayList(alertas);
    }

    @PostMapping(value="/salvar")
    public void persistirAlerta(@RequestBody Alerta alertas) {
        DBAlerta.persistirAlerta(alertas);
    }
}