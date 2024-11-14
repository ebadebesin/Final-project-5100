package edu.neu.mgen.finalproject5100.service;
import com.jzhangdeveloper.newsapi.models.TopHeadlines;
import com.jzhangdeveloper.newsapi.net.NewsAPI;
import com.jzhangdeveloper.newsapi.net.NewsAPIClient;
import com.jzhangdeveloper.newsapi.net.NewsAPIResponse;
import com.jzhangdeveloper.newsapi.params.TopHeadlinesParams;
import edu.neu.mgen.finalproject5100.model.Article;
import edu.neu.mgen.finalproject5100.util.DateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class NewsService {
    @Value("${newsapi.key}")
    private String newsApiKey;

    /*
        //@Scheduled(cron = "sec min hour dayOfMonth month dayOfWeek(0-7)", zone = "Europe/Paris")
        @Scheduled(cron = "0 0 6-12 * * ?")
        public void scheduleNewsUpdateTask(){
            //
        }
    */


    public Article getLatest() {
        NewsAPIClient client = NewsAPI.newClientBuilder().setApiKey(newsApiKey).build();
        Map<String, String> topHeadlineParams = TopHeadlinesParams.newBuilder().setCountry("us").setPageSize(1).build();
        Article article;
        try {
            TopHeadlines headlines;
            NewsAPIResponse response = client.getTopHeadlines(topHeadlineParams);
            // get status code
            response.getStatusCode();
            com.jzhangdeveloper.newsapi.models.Article news;
            // get response body as a Java object and Json object (use Gson)
            headlines = response.getBody();
            news = headlines.getArticles().getFirst();
            article = new Article(null, DateUtil.getStartOfDate(new Date()), news.getTitle(), news.getContent(), news.getUrlToImage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return article;

    }

}
