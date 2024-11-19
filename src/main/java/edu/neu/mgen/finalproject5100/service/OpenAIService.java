package edu.neu.mgen.finalproject5100.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import edu.neu.mgen.finalproject5100.model.Summary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class OpenAIService {
    
    @Value("${openai.api.key}")
    private String openaiApiKey;
    
    public Summary evaluateSummary(Summary summary) {
        OpenAiService service = new OpenAiService(openaiApiKey);
        
        // Define the criteria and ask for feedback in a JSON format
        String promptContent = String.format("""
            Please evaluate this summary of the article and provide:
            1. A score from 1-10
            2. Constructive feedback on the following criteria: conciseness, clarity, length, and readability.
            
            Summary: %s
            
            Respond in JSON format:
            {
                "score": <number>,
                "feedback": {
                    "conciseness": "<feedback on conciseness>",
                    "clarity": "<feedback on clarity>",
                    "length": "<feedback on length>",
                    "readability": "<feedback on readability>"
                }
            }
            """, summary.getUserSummary());

        // Create a list of chat messages with the system role
        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage("system", "You are a helpful assistant that evaluates article summaries."));
        messages.add(new ChatMessage("user", promptContent));

        // Build the chat completion request
        ChatCompletionRequest request = ChatCompletionRequest.builder()
            .model("gpt-3.5-turbo")
            .messages(messages)
            .build();
            
        String response = service.createChatCompletion(request)
            .getChoices().get(0).getMessage().getContent();
            
        // Parse the JSON response and update the Summary object
        parseFeedback(response, summary);

        return summary;
    }
    
    private void parseFeedback(String jsonResponse, Summary summary) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(jsonResponse);
            // Extract score and feedback details
            summary.setScore(jsonNode.get("score").asInt());
            String feedback = String.format(
                "Conciseness: %s\nClarity: %s\nLength: %s\nReadability: %s",
                jsonNode.get("feedback").get("conciseness").asText(),
                jsonNode.get("feedback").get("clarity").asText(),
                jsonNode.get("feedback").get("length").asText(),
                jsonNode.get("feedback").get("readability").asText()
            );
            summary.setFeedback(feedback);
        } catch (IOException e) {
            e.printStackTrace();
            summary.setScore(0);
            summary.setFeedback("Error parsing feedback from AI response.");
        }
    }
}


// package edu.neu.mgen.finalproject5100.service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.http.*;
// import java.util.Map;

// @Service
// public class OpenAIService {
//     @Value("${openai.api.key}")
//     private String apiKey;
    
//     private final RestTemplate restTemplate = new RestTemplate();
//     private final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

//     public Map<String, Object> evaluateSummary(String originalText, String userSummary) {
//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.setBearerAuth(apiKey);

//         String prompt = String.format(
//             "Evaluate this summary of the following text. Original text: %s\n\nUser's summary: %s\n\n" +
//             "Provide a score from 1-100 and brief feedback in JSON format like this: {\"score\": X, \"feedback\": \"Your feedback here\"}", 
//             originalText, userSummary
//         );

//         Map<String, Object> requestBody = Map.of(
//             "model", "gpt-3.5-turbo",
//             "messages", new Object[]{
//                 Map.of(
//                     "role", "user",
//                     "content", prompt
//                 )
//             }
//         );

//         HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//         ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_API_URL, request, Map.class);
        
//         // Parse OpenAI response and return score/feedback
//         String aiResponse = ((Map)((Map)((Object[])response.getBody().get("choices"))[0]).get("message")).get("content").toString();
//         // Assume AI returns JSON string that we parse into map
//         // In production, you'd want more robust JSON parsing
//         return Map.of(
//             "score", 85, // Parse from AI response
//             "feedback", aiResponse
//         );
//     }
// }
