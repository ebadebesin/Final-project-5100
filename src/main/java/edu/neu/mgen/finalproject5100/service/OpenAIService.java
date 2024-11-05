package edu.neu.mgen.finalproject5100.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

@Service
public class OpenAIService {
    @Value("${openai.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    public Map<String, Object> evaluateSummary(String originalText, String userSummary) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String prompt = String.format(
            "Evaluate this summary of the following text. Original text: %s\n\nUser's summary: %s\n\n" +
            "Provide a score from 1-100 and brief feedback in JSON format like this: {\"score\": X, \"feedback\": \"Your feedback here\"}", 
            originalText, userSummary
        );

        Map<String, Object> requestBody = Map.of(
            "model", "gpt-3.5-turbo",
            "messages", new Object[]{
                Map.of(
                    "role", "user",
                    "content", prompt
                )
            }
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_API_URL, request, Map.class);
        
        // Parse OpenAI response and return score/feedback
        String aiResponse = ((Map)((Map)((Object[])response.getBody().get("choices"))[0]).get("message")).get("content").toString();
        // Assume AI returns JSON string that we parse into map
        // In production, you'd want more robust JSON parsing
        return Map.of(
            "score", 85, // Parse from AI response
            "feedback", aiResponse
        );
    }
}
