package edu.neu.mgen.finalproject5100.controller;

import edu.neu.mgen.finalproject5100.model.Article;
import edu.neu.mgen.finalproject5100.model.ErrorResponse;
import edu.neu.mgen.finalproject5100.model.History;
import edu.neu.mgen.finalproject5100.model.Summary;
import edu.neu.mgen.finalproject5100.repository.ArticleRepository;
import edu.neu.mgen.finalproject5100.repository.SummaryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class HistoryController {
    @Autowired
    private SummaryRepository summaryRepository;
    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("/")
    public ResponseEntity<?> home(
            @RequestParam("timeline") long timeline,
            @RequestParam("uid") String uid) {
        int limit = 50;
        Date timelineDate;
        timelineDate = new Date(timeline);

        List<Summary> summaries = summaryRepository.findAllByUserId(uid, timelineDate, limit);
        ArrayList<String> articleIds = new ArrayList<>();
        summaries.forEach(summary -> {
            articleIds.add(summary.getArticleId());
        });
        ArrayList<Article> articles = articleRepository.findAllByIds(articleIds);

        History history = new History();
        history.setArticles(articles);
        history.setSummaries((ArrayList<Summary>) summaries);
        history.setTimeline(summaries.getLast().getSubmissionDate().getTime());

        return ResponseEntity.ok(history);
    }


}
