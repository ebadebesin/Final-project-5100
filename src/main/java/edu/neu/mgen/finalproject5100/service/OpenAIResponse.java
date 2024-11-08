package edu.neu.mgen.finalproject5100.service;

import com.google.gson.annotations.SerializedName;

public class OpenAIResponse {
    @SerializedName("choices")
    private Choice[] choices;

    public String getFeedback() {
        return choices != null && choices.length > 0 ? choices[0].getText() : null;
    }

    public static class Choice {
        private String text;
        
        public String getText() {
            return text;
        }
    }
}
