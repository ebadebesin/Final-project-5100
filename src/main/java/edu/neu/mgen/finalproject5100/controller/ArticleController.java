package edu.neu.mgen.finalproject5100.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ArticleController {

    @GetMapping("/id/{articleId}")
    public ResponseEntity<?> getArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok(true);
    }
}
