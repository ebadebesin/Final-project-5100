package edu.neu.mgen.finalproject5100.repository;

import edu.neu.mgen.finalproject5100.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface SummaryRepository extends JpaRepository<Summary, Long> {
    @Query("SELECT s FROM Summary s WHERE s.articleId = ?1 ORDER BY s.score DESC LIMIT 1")
    Optional<Summary> findBestScoreByArticleId(Long articleId);
}