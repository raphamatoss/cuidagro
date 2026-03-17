package com.cuidagro.server.APIControllers.DTOs;

import com.cuidagro.server.enums.Especialidade;
import com.cuidagro.server.enums.PapelUsuario;

import java.time.LocalDate;

public record RegisterDTO(String nome, String email, String numero, String cpf, String senha, PapelUsuario papel, LocalDate dataNascimento, String crm, Especialidade especialidade) {
}
