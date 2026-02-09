package com.cuidagro.server.APIControllers;

import com.cuidagro.server.Consulta;
import com.cuidagro.server.DBCommunication.DBConsulta;
import com.cuidagro.server.helpers.Serializacao;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    // Listar histórico:
    @GetMapping("/historico")
    public String obterHistorico(@RequestParam("cpf") String cpf) {
        // Busca no banco (já trazendo Endereço e Local montados)
        ArrayList<Consulta> historico = DBConsulta.getHistoricoPorCpf(cpf);

        return Serializacao.serializarListaConsultas(historico);
    }

    // Agendar consulta:
    // Espera um JSON com a estrutura da Consulta (Data, Médico, Agricultor, Local)
    @PostMapping("/agendar")
    public boolean agendarConsulta(@RequestBody Consulta consulta) {
        // Chama o método blindado que salva Endereço, depois Local e depois Consulta.
        return DBConsulta.salvar(consulta);
    }

    // Cancelar Consulta
    // Espera um JSON contendo pelo menos: data, medico (cpf) e status
    @PostMapping("/cancelar")
    public boolean cancelarConsulta(@RequestBody Consulta consulta) {
        return DBConsulta.atualizarStatus(consulta);
    }
}