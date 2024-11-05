package edu.neu.mgen.finalproject5100.controller;

import edu.neu.mgen.finalproject5100.model.Summary;
import edu.neu.mgen.finalproject5100.repository.SummaryRepository;
import edu.neu.mgen.finalproject5100.service.OpenAIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/summaries")
@CrossOrigin(origins = "http://localhost:8080")
public class SummaryController {
    @Autowired
    private SummaryRepository summaryRepository;
    
    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateSummary(@RequestBody Map<String, String> request) {
        String originalText = request.get("originalText");
        String userSummary = request.get("userSummary");
        Long articleId = Long.parseLong(request.get("articleId"));

        Map<String, Object> evaluation = openAIService.evaluateSummary(originalText, userSummary);
        
        Summary summary = new Summary();
        summary.setArticleId(articleId);
        summary.setUserSummary(userSummary);
        summary.setScore((Integer) evaluation.get("score"));
        summary.setFeedback((String) evaluation.get("feedback"));
        summary.setSubmissionDate(LocalDateTime.now());
        
        summaryRepository.save(summary);
        
        return ResponseEntity.ok(evaluation);
    }

    @GetMapping("/best/{articleId}")
    public ResponseEntity<?> getBestScore(@PathVariable Long articleId) {
        return ResponseEntity.ok(summaryRepository.findBestScoreByArticleId(articleId));
    }
}
