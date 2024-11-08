package edu.neu.mgen.finalproject5100.service;

public class OpenAIRequest {
    private String prompt;
    private String model = "text-davinci-003";
    private int max_tokens = 100;

    public OpenAIRequest(String prompt) {
        this.prompt = prompt;
    }

    // Getters and Setters
    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }

    public int getMax_tokens() {
        return max_tokens;
    }
    public void setMax_tokens(int max_tokens) {
        this.max_tokens = max_tokens;
    }


}
