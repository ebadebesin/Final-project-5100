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

// import com.theokanning.openai.completion.chat.ChatCompletionRequest;
// import com.theokanning.openai.completion.chat.ChatMessage;
// import com.theokanning.openai.service.OpenAiService;
// import edu.neu.mgen.finalproject5100.model.Summary;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;

// import java.util.ArrayList;
// import java.util.List;

// @Service
// public class OpenAIService {
    
//     @Value("${openai.api.key}")
//     private String openaiApiKey;
    
//     public Summary evaluateSummary(Summary summary) {
//         OpenAiService service = new OpenAiService(openaiApiKey);
        
//         String promptContent = String.format("""
//             Please evaluate this summary of the article and provide:
//             1. A score from 0-100
//             2. Constructive feedback
            
//             Summary: %s
            
//             Respond in JSON format:
//             {
//                 "score": <number>,
//                 "feedback": "<feedback text>"
//             }
//             """, summary.getUserSummary());
        
//         // Create a list of chat messages
//         List<ChatMessage> messages = new ArrayList<>();
//         messages.add(new ChatMessage("system", "You are a helpful assistant that evaluates article summaries."));
//         messages.add(new ChatMessage("user", promptContent));
        
//         // Build the chat completion request
//         ChatCompletionRequest request = ChatCompletionRequest.builder()
//             .model("gpt-3.5-turbo")
//             .messages(messages)
//             .build();
            
//         String response = service.createChatCompletion(request)
//             .getChoices().get(0).getMessage().getContent();
            
//         // Parse JSON response and update summary
//         // You'll need to add proper JSON parsing here
//         summary.setScore(95); // Example score
//         summary.setFeedback("Great summary! Clear and concise."); // Example feedback
        
//         return summary;
//     }
// }



