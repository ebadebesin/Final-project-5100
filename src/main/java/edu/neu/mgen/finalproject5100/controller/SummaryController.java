package edu.neu.mgen.finalproject5100.controller;

import edu.neu.mgen.finalproject5100.model.Article;
import edu.neu.mgen.finalproject5100.model.ErrorResponse;
import edu.neu.mgen.finalproject5100.model.Summary;
import edu.neu.mgen.finalproject5100.repository.SummaryRepository;
import edu.neu.mgen.finalproject5100.service.OpenAIService;
// import edu.neu.mgen.finalproject5100.repository.SummaryRepository;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

// import java.time.LocalDateTime;
// import java.util.List;

@RestController
@RequestMapping("/api/summaries")
@CrossOrigin(origins = "http://localhost:5173")
public class SummaryController {
    
    private static final Logger logger = LoggerFactory.getLogger(SummaryController.class);
    
    @Autowired
    private OpenAIService openAIService;
    
     @Autowired
     private SummaryRepository summaryRepository;
    
    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateSummary(@RequestBody Summary summary) {
        try {
            logger.info("Received summary for evaluation: {}", summary);
            Summary evaluatedSummary = openAIService.evaluateSummary(summary);
            return ResponseEntity.ok(evaluatedSummary);
        } catch (Exception e) {
            logger.error("Error evaluating summary: ", e);
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Error evaluating summary: " + e.getMessage()));
        }
    }
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Summary summary = new Summary();
        summary.setArticleId("fdjalkfdla");
        summary.setOriginalText("fdjalkfdla");
        summary.setUserSummary("fdjalkfdla");
        summary.setFeedback("fdjalkfdla");
        summary.setScore(111);
        Summary sumRet = summaryRepository.save(summary);
        return ResponseEntity.ok(sumRet);
    }

}









// import edu.neu.mgen.finalproject5100.model.Summary;
// import edu.neu.mgen.finalproject5100.repository.SummaryRepository;
// import edu.neu.mgen.finalproject5100.service.OpenAIService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.time.LocalDateTime;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/summaries")
// @CrossOrigin(origins = "http://localhost:8080")
// public class SummaryController {
//     @Autowired
//     private SummaryRepository summaryRepository;
    
//     @Autowired
//     private OpenAIService openAIService;

//     @PostMapping("/evaluate")
//     public ResponseEntity<?> evaluateSummary(@RequestBody Map<String, String> request) {
//         String originalText = request.get("originalText");
//         String userSummary = request.get("userSummary");
//         Long articleId = Long.parseLong(request.get("articleId"));

//         Map<String, Object> evaluation = openAIService.evaluateSummary(originalText, userSummary);
        
//         Summary summary = new Summary();
//         summary.setArticleId(articleId);
//         summary.setUserSummary(userSummary);
//         summary.setScore((Integer) evaluation.get("score"));
//         summary.setFeedback((String) evaluation.get("feedback"));
//         summary.setSubmissionDate(LocalDateTime.now());
        
//         summaryRepository.save(summary);
        
//         return ResponseEntity.ok(evaluation);
//     }

//     @GetMapping("/best/{articleId}")
//     public ResponseEntity<?> getBestScore(@PathVariable Long articleId) {
//         return ResponseEntity.ok(summaryRepository.findBestScoreByArticleId(articleId));
//     }
// }
