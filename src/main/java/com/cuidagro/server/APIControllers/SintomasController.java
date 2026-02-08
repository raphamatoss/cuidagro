package com.cuidagro.server.APIControllers;

import com.cuidagro.server.DBCommunication.DBSintomas;
import com.cuidagro.server.Sintoma;
import com.cuidagro.server.SintomaForms;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/sintomas")
public class SintomasController {
    @GetMapping()
    public String sintomas() {
        ArrayList<Sintoma> sintomas = DBSintomas.getAll();
        return Serializacao.serializarArrayList(sintomas);
    }

    @PostMapping(value="/forms")
    public void persistirUsoDeAgrotoxicosPorUsuario(@RequestBody SintomaForms forms) {
        DBSintomas.persistirForms(forms);
    }
//
//    @PostMapping(value="/forms/diagnostico")
//    public void diagnosticoParcial(@RequestBody Sintoma[] sintomas) {
//
//    }
}
