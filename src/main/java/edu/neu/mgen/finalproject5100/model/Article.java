package edu.neu.mgen.finalproject5100.model;

import java.time.LocalDateTime;
import java.util.Date;
// import com.google.cloud.gcp.data.firestore.Document;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.web.util.HtmlUtils;

// @Document(collectionName = "article")
@Data
public class Article {
    @Id
    private String id;
    private String title;
    private String content;
    private String poster;
    private Date createTime = new Date();


    public Article(String id, String title, String content, String poster) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.poster = poster;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime){
        this.createTime = createTime;
    }


    @Override
    public String toString() {
        return "{" +
                "'id':'" + id + "'," +
                "'title':'" + HtmlUtils.htmlEscape(title) + "'," +
                "'content':'" + HtmlUtils.htmlEscape(content) + "'," +
                "'poster':'" + HtmlUtils.htmlEscape(poster) + "'," +
                "'createTime':'" + createTime.getTime() + "'," +
                "}";
    }

}
