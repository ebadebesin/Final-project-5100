package edu.neu.mgen.finalproject5100.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.neu.mgen.finalproject5100.model.Article;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/*
    //@Scheduled(cron = "sec min hour dayOfMonth month dayOfWeek(0-7)", zone = "Europe/Paris")
    @Scheduled(cron = "0 0 6-12 * * ?")
    public void scheduleNewsUpdateTask(){
        //
    }
*/

@Service
public class NewsService {
//    @Value("${newsapi.key}")
//    private String newsApiKey;

    private final String apiUrl = "http://www.terryye.com/news/newsApi.php";

    private final RestTemplate restTemplate;


    @Data
    private static class News {
        private String title;
        private String content;
        private String image_url;
        private String pubDate;
        private String pubDateTZ;

    }

    @Data
    private static class NewsResponse {
        @JsonProperty("results")
        private List<News> news;

        @JsonProperty("status")
        private String status;

        @JsonProperty("totalResults")
        private int totalResults;
    }

    public NewsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Article getLatest() {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
//                .queryParam("apikey", newsApiKey)
                .queryParam("category", "politics")
                .queryParam("language", "en")
                .queryParam("country", "us")
                .queryParam("image", "1")
                .queryParam("size", "1")
                .toUriString();
        try {
            NewsResponse response = restTemplate.getForObject(url, NewsResponse.class);
            String responseStr = restTemplate.getForObject(url, String.class);
            System.out.println(responseStr);

            if (response == null || response.totalResults == 0 || response.news.isEmpty()) {
                return null;
            }

            News news = response.news.getFirst();
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z");
            Date date = df.parse(news.pubDate + " " + news.pubDateTZ);

            return new Article(
                    null,
                    date,
                    news.getTitle(),
                    news.getContent(),
                    news.getImage_url()
            );

        } catch (Exception e) {
            throw new RuntimeException("Error saving article", e);
        }
    }

}
