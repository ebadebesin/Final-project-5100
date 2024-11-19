package edu.neu.mgen.finalproject5100.repository;

import edu.neu.mgen.finalproject5100.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class SummaryRepository {
    private static final String COLLECTION_NAME = "summaries";

    public Summary save(Summary summary) {
        try {
            Firestore firestore = FirestoreClient.getFirestore();

            // If no ID exists, generate one
            if (summary.getId() == null) {
                summary.setId(firestore.collection(COLLECTION_NAME).document().getId());
            }

            ApiFuture<WriteResult> future = firestore
                    .collection(COLLECTION_NAME)
                    .document(summary.getId())
                    .set(summary);
            future.get(); // Wait for the operation to complete
            return summary;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving summary", e);
        }
    }

    public Summary findBestScoreByArticleId(String articleId, String userId) {
        try {
            Firestore firestore = FirestoreClient.getFirestore();

            // Query for summaries with the given articleId and userId, ordered by score
            ApiFuture<QuerySnapshot> future = firestore
                    .collection(COLLECTION_NAME)
                    .whereEqualTo("articleId", articleId)
                    .whereEqualTo("userId", userId)
                    // .orderBy("score", Query.Direction.DESCENDING)
                    .limit(1)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                return documents.get(0).toObject(Summary.class);
            }
            return null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding best score", e);
        }
    }

    public List<Summary> findAllByArticleId(String articleId, String userId) {
        try {
            Firestore firestore = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> future = firestore
                    .collection(COLLECTION_NAME)
                    .whereEqualTo("articleId", articleId)
                    .whereEqualTo("userId", userId)
                    // .orderBy("submissionDate", Query.Direction.DESCENDING)
                    .get();

            List<Summary> summaries = new ArrayList<>();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                summaries.add(document.toObject(Summary.class));
            }
            return summaries;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding summaries", e);
        }
    }


    public List<Summary> findAllByUserId(String userId, Date submissionDateLessThan, int limit) {
        try {
            if (submissionDateLessThan == null) {
                submissionDateLessThan = new Date();
            }
            if (userId == null) {
                throw new IllegalArgumentException("userId cannot be null");
            }
            if (limit <= 0) {
                throw new IllegalArgumentException("limit must be greater than 0");
            }

            Firestore firestore = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> future = firestore
                    .collection(COLLECTION_NAME)
                    .whereLessThan("submissionDate", submissionDateLessThan)
                    .whereEqualTo("userId", userId)
                    .orderBy("submissionDate", Query.Direction.DESCENDING)
                    .limit(limit)
                    .get();

            List<Summary> summaries = new ArrayList<>();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                summaries.add(document.toObject(Summary.class));
            }
            return summaries;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding summaries", e);
        }
    }

}
