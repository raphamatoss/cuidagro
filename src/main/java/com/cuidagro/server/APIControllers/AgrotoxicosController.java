package com.cuidagro.server.APIControllers;

import com.cuidagro.server.Agrotoxico;
import com.cuidagro.server.AgrotoxicoForms;
import com.cuidagro.server.DBCommunication.DBAgrotoxicos;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/agrotoxicos")
public class AgrotoxicosController {
    @GetMapping()
    public String agrotoxicos() {
        ArrayList<Agrotoxico> agrotoxicos = DBAgrotoxicos.getAll();
        return Serializacao.serializarArrayList(agrotoxicos);
    }

    @GetMapping(params="classe")
    public String agrotoxicosPorClasse(@RequestParam("classe") String classe) {
        ArrayList<Agrotoxico> agrotoxicos = DBAgrotoxicos.getByClass(classe);
        return Serializacao.serializarArrayList(agrotoxicos);
    }

    @PostMapping(value="/forms")
    public void persistirUsoDeAgrotoxicosPorUsuario(@RequestBody AgrotoxicoForms forms) {
        DBAgrotoxicos.persistirForms(forms);
    }
}
