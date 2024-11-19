package edu.neu.mgen.finalproject5100.repository;

import edu.neu.mgen.finalproject5100.model.Summary;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import java.util.Optional;

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

    public Summary save(Summary summary, String userId) {
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            
            // If no ID exists, generate one
            if (summary.getId() == null) {
                summary.setId(firestore.collection(COLLECTION_NAME).document().getId());
            }

            // Assign the userId to the summary
            summary.setUserId(userId);

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
}
