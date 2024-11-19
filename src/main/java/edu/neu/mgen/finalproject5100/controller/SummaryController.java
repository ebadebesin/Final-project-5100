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

import java.util.Date;

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
    
    // @PostMapping("/evaluate")
    // public ResponseEntity<?> evaluateSummary(@RequestBody Summary summary) {
    //     try {
    //         logger.info("Received summary for evaluation: {}", summary);
    //         Summary evaluatedSummary = openAIService.evaluateSummary(summary);
    //         return ResponseEntity.ok(evaluatedSummary);
    //     } catch (Exception e) {
    //         logger.error("Error evaluating summary: ", e);
    //         return ResponseEntity.internalServerError()
    //             .body(new ErrorResponse("Error evaluating summary: " + e.getMessage()));
    //     }
    // }

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateSummary(@RequestBody Summary summary, @RequestHeader(value = "userId", required = false) String userId) {
        try {
            logger.info("Received summary for evaluation: {}", summary);

            // Use a default/test userId if not provided in the request
            if (userId == null || userId.isEmpty()) {
                userId = "test-user-1"; // Replace with a more meaningful default if needed
            }

            // Attach userId and set submission date
            summary.setUserId(userId);
            summary.setSubmissionDate(new Date());

            // Evaluate and save the summary
            Summary evaluatedSummary = openAIService.evaluateSummary(summary);
            Summary savedSummary = summaryRepository.save(evaluatedSummary, userId);

            return ResponseEntity.ok(savedSummary);
        } catch (Exception e) {
            logger.error("Error evaluating summary: ", e);
            return ResponseEntity.internalServerError()
                    .body(new ErrorResponse("Error evaluating summary: " + e.getMessage()));
        }
    }




    // @GetMapping("/test")
    // public ResponseEntity<?> test() {
    //     Summary summary = new Summary();
    //     summary.setArticleId("fdjalkfdla");
    //     summary.setOriginalText("fdjalkfdla");
    //     summary.setUserSummary("fdjalkfdla");
    //     summary.setFeedback("fdjalkfdla");
    //     summary.setScore(111);
    //     Summary sumRet = summaryRepository.save(summary);
    //     return ResponseEntity.ok(sumRet);
    // }

}
