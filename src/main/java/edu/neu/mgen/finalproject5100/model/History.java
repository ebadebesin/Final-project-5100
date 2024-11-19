package edu.neu.mgen.finalproject5100.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class History {
    private ArrayList<Article> articles;
    private ArrayList<Summary> summaries;
    private long timeline;
}
