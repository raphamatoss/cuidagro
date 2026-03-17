package com.cuidagro.server;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

public class Teste {
    public static void main(String[] args) {
        // The client gets the API key from the environment variable `GOOGLE_API_KEY`.
        Client client = new Client();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3-flash-preview",
                        "Me liste 3 agrotoxicos utilizados no Brasil.",
                        null);

        System.out.println(response.text());
    }
}
