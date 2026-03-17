package com.cuidagro.server.ComunicacaoExterna;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

public class GeminiAPI {

    public static String gerarDiagnosticoParcial(String prompt) {
        Client client = new Client();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3-flash-preview",
                        prompt,
                        null);

        return response.text();
    }
}
