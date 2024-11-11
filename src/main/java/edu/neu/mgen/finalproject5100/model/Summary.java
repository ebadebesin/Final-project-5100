package edu.neu.mgen.finalproject5100.model;

import java.time.LocalDateTime;
// import com.google.cloud.gcp.data.firestore.Document;
import lombok.Data;
import org.springframework.data.annotation.Id;

// @Document(collectionName = "summaries")
@Data
public class Summary {
    @Id
    private String id;
    private String articleId;
    private String originalText;
    private String userSummary;
    private String feedback;
    private int score;
    private LocalDateTime submissionDate = LocalDateTime.now();

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getArticleId() { return articleId; }
    public void setArticleId(String articleId) { this.articleId = articleId; }
    
    public String getUserSummary() { return userSummary; }
    public void setUserSummary(String userSummary) { this.userSummary = userSummary; }
    
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    
    public LocalDateTime getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDateTime submissionDate) { this.submissionDate = submissionDate; }

}


//Sample output from test
// 2024-11-11 00:37:14 INFO  e.n.m.f.controller.SummaryController - Received summary for evaluation: Summary(id=null, articleId=1, originalText=CNN — Before Election Day has even arrived, the “Stop the Steal” movement has reemerged in force, with some of the same activists who tried to overturn former President Donald Trump’s 2020 loss outlining a step-by-step guide to undermine the results if he falls short again.

// For months, those activists – who have been priming Trump supporters to believe the only way the former president can lose in 2024 is through fraud – have laid out proposals to thwart a potential Kamala Harris victory. Their plans include challenging results in court, pressuring., userSummary="Stop the Steal" Movement: The "Stop the Steal" movement, which aimed to overturn the 2020 election results, is re-emerging. Activists are preparing strategies to challenge potential election outcomes in the upcoming election., feedback=null, score=0, submissionDate=2024-11-11T00:37:14.489598)
