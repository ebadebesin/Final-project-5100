package edu.neu.mgen.finalproject5100.controller;
<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
=======

import edu.neu.mgen.finalproject5100.model.Article;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import edu.neu.mgen.finalproject5100.repository.ArticleRepository;
>>>>>>> features/articles

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ArticleController {

<<<<<<< HEAD
    @GetMapping("/id/{articleId}")
    public ResponseEntity<?> getArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok(true);
=======
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getArticle(@PathVariable String id) {
        ArticleRepository articleRepo = new ArticleRepository();
        Article article = articleRepo.findById(id);

        return ResponseEntity.ok(article);
    }

    @GetMapping("/test")
    public ResponseEntity<?> getArticle() {
        ArticleRepository articleRepo = new ArticleRepository();
        articleRepo.save(new Article(
                null,
                "title is hello world",
                "content is how are you :)",
                null));
        return ResponseEntity.ok("Saved article");
>>>>>>> features/articles
    }
}
