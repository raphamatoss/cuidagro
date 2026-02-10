package com.cuidagro.server.APIControllers.DTOs;

public record AuthResponseDTO(String token, String cpf, String nome, String papel, String email) {
}
