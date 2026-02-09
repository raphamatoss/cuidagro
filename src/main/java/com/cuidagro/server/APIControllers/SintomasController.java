package com.cuidagro.server.APIControllers;

import com.cuidagro.server.*;
import com.cuidagro.server.ComunicacaoExterna.GeminiAPI;
import com.cuidagro.server.DBCommunication.DBAgrotoxicos;
import com.cuidagro.server.DBCommunication.DBDadosDeSaude;
import com.cuidagro.server.DBCommunication.DBDoenca;
import com.cuidagro.server.DBCommunication.DBSintomas;
import com.cuidagro.server.helpers.GeradorDePrompt;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping("/sintomas")
public class SintomasController {
    @GetMapping()
    public String sintomas() {
        ArrayList<Sintoma> sintomas = DBSintomas.getAll();
        return Serializacao.serializarArrayList(sintomas);
    }

    @PostMapping(value="/forms")
    public String persistirSintomasDeUsuario(@RequestBody SintomaForms forms) {
        DBSintomas.persistirForms(forms);
        ArrayList<String> agrotoxicos = DBAgrotoxicos.getByAgricultor(forms.getCPF());
        DadosDeSaude dados = DBDadosDeSaude.getByAgricultor(forms.getCPF());
        String prompt = GeradorDePrompt.gerarPrompt(new ArrayList<Sintoma>(Arrays.asList(forms.getSintomas())), agrotoxicos, dados);
        return GeminiAPI.gerarDiagnosticoParcial(prompt);
    }
}
