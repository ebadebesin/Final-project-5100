package edu.neu.mgen.finalproject5100.firebase;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FirebaseInitialization {

    public void initialization(){
        FileInputStream serviceAccount = null;
        try{
        serviceAccount = new FileInputStream("/Users/ebunadebesin/Desktop/finalproject5100/src/main/resources/serviceAccount.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();

        FirebaseApp.initializeApp(options);
        }catch(Exception e){
            e.printStackTrace();
        }    
        finally{
            if (serviceAccount != null) {
                try {
                    serviceAccount.close();
                } catch (IOException e) {
                    // Handle closing exception (optional)
                    e.printStackTrace();
                }
            }
        }

    }
}
