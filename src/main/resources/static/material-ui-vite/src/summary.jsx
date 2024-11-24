import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./Components/TopBar";
import BottomNavBar from "./Components/BottomNavBar";
import { useUser } from "./Hooks/UseUser";

const SummaryComponent = () => {
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { articleId } = useParams(); // Access article ID from URL

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const { id: userId } = useUser(); // Retrieve user ID

    try {
      const response = await fetch("http://localhost:8080/api/summaries/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userId, // Include userId in headers
        },
        body: JSON.stringify({
          articleId,
          userSummary: summary,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to evaluate summary");
      }

      const result = await response.json();
      if (result && result.score != null && result.feedback) {
        navigate(`/feedback/${articleId}`, { state: { feedback: result } });
      } else {
        throw new Error("Unexpected response structure from backend.");
      }
    } catch (error) {
      console.error("Error submitting summary:", error);
      setError(error.message || "An error occurred while evaluating your summary");
    } finally {
      setLoading(false);
    }
  };

  const handleTryLater = () => {
    navigate("/today"); // Navigate to the desired page (e.g., "Today" page or home)
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <TopBar title="Summarize"></TopBar>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Write Your Summary
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter your summary here..."
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !summary.trim()}
          >
            {loading ? "Submitting..." : "Submit Summary"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleTryLater}
          >
            Try Later
          </Button>
          
        </Box>
      </Paper>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
      {/* <BottomNavBar /> */}
    </Box>
  );
};

export default SummaryComponent;



// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Paper, 
//   Typography, 
//   TextField, 
//   Button, 
//   Card,
//   CardContent,
//   IconButton,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate, useParams } from 'react-router-dom';
// import TopBar from './Components/TopBar'
// import BottomNavBar from './Components/BottomNavBar'
// import { useArticles } from "./Hooks/UseArticles";
// import { useUser } from "./Hooks/UseUser";
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


// const SummaryComponent = () => {
//   const [summary, setSummary] = useState('');
//   const [feedback, setFeedback] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { articleId } = useParams(); // Access article ID from URL
//   const [article, setArticle] = useState(null);

//   const [isDialogOpen, setDialogOpen] = useState(false);


//   useEffect(() => {
//     const fetchArticle = async () => {
//         if (articleId) {
//           try {
//             const response = await fetch(`http://localhost:8080/api/articles/id/${articleId}`);
//             if (!response.ok) {
//               throw new Error("Failed to fetch article");
//             }
//             const articleData = await response.json();
//             console.log("Fetched article:", articleData);
//             setArticle(articleData);
//           } catch (error) {
//             console.error("Error fetching article:", error.message);
//             setError(error.message || "Error fetching article");
//           }
//         }
//       };
//     //         const response = await fetch(`http://localhost:8080/api/articles/latest`);
//     //         const articleData = await response.json();
//     //         setArticle(articleData);
//     //     }
//     // };

//     fetchArticle();
// }, [articleId]);


//   const previewText = article?.content 
//     ? article.content.split('\n').slice(0, 1).join('\n') 
//     : 'Loading article...';

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     const { id: userId } = useUser(); // Retrieve user ID
    
//     try {
//       const response = await fetch('http://localhost:8080/api/summaries/evaluate', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'userId': userId, // Include userId in headers
//         },
//         body: JSON.stringify({
//           articleId: article.id,
//           originalText: article.content,
//           userSummary: summary,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to evaluate summary');
//       }

//       const result = await response.json();
      
//       if (result && result.score != null && result.feedback) {
//         setFeedback(result);

//       } else {
//         throw new Error("Unexpected response structure from backend.");
//       }
//     } catch (error) {
//       console.error('Error submitting summary:', error);
//       setError(error.message || 'An error occurred while evaluating your summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTryAgain = () => {
//     // setSummary('');
//     setFeedback(null);
//     // setError(null);
//     setDialogOpen(true);
//   };

//   const handleConfirm = async () => {
//     setDialogOpen(false);
//   };

//   const handleCancel = () => {
//     setDialogOpen(false);
//   };

//   const handleTryLater = () => {
//     navigate(-1);
//   };

//   const handleClose = () => {
//     navigate(-1);
//   };

//   return (
//     <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, position: 'relative' }}>
//       <TopBar title="Summarize"></TopBar>
//       <IconButton 
//         onClick={handleClose} 
//         sx={{ 
//           position: 'absolute', 
//           top: 16, 
//           right: 16, 
//           color: 'grey.600', 
//           bgcolor: 'white', 
//           borderRadius: '50%',
//           boxShadow: 1,
//         }}
//         size="large"
//       >
//         <CloseIcon fontSize="inherit" />
//       </IconButton>

//       <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Read 
//           {/* {article.title} */}
//         </Typography>
//         <Box sx={{ whiteSpace: 'pre-wrap' }}>
//               <Typography variant="body1">{previewText}</Typography>
//             </Box>
//         {/* <Typography paragraph>
//           {previewText} */}
//           {/* {article?.content} */}
//         {/* </Typography> */}
//       </Paper>

//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Write Your Summary
//         </Typography>
//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           value={summary}
//           onChange={(e) => setSummary(e.target.value)}
//           placeholder="Enter your summary here..."
//           sx={{ marginBottom: 2 }}
//         />
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button 
//             variant="contained" 
//             onClick={handleSubmit}
//             disabled={loading || !summary.trim() || feedback}
//           >
//             {loading ? 'Submitting...' : 'Submit Summary'}
//           </Button>
//           <Button 
//             variant="outlined" 
//             onClick={handleTryLater}
//           >
//             Try Later
//           </Button>
//         </Box>
//       </Paper>

//       {feedback && (
//         <Card sx={{ marginTop: 3, padding: 2 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Score: {feedback.score}/10
//             </Typography>
//             <Box sx={{ whiteSpace: 'pre-wrap' }}>
//               {feedback.feedback.split('\n').map((line, index) => {
//                 const parts = line.split(':');
//                 if (parts.length > 1) {
//                   // Criteria title and description
//                   return (
//                     <React.Fragment key={index}>
//                       <Typography variant="body1" style={{ fontWeight: 'bold' }}>
//                         {parts[0]}
//                       </Typography>
//                       <Typography variant="body1">{parts[1] + (index === feedback.feedback.split('\n').length - 1 ? '' : ' ')}</Typography>
//                     </React.Fragment>
//                   );
//                 } else {
//                   return <Typography variant="body1" key={index}>{line}<br /></Typography>;
//                 }
//               })}
//             </Box>
//             {/* <Box sx={{ whiteSpace: 'pre-wrap' }}>
//               <Typography variant="body1">{feedback.feedback}</Typography>
//             </Box> */}
//             {/* <Typography paragraph>
//               {feedback.feedback}
//             </Typography> */}
//             <Button 
//               variant="outlined" 
//               onClick={handleTryAgain}
//               sx={{ marginTop: 2 }}
//             >
//               Try Again
//             </Button>

//             <Dialog
//             open={isDialogOpen}
//             onClose={handleCancel}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">{"Confirm Submission"}</DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Submitting a new summary will overwrite your previous score and feedback. Are you sure you want to continue?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCancel} color="secondary">
//                 Cancel
//               </Button>
//               <Button onClick={handleConfirm} color="primary" autoFocus>
//                 Confirm
//               </Button>
//             </DialogActions>
//           </Dialog>

//           </CardContent>
//         </Card>
//       )}


//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//       >
//         <Alert onClose={() => setError(null)} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default SummaryComponent;


// //work on saving summary to database once and auto replacing score and feedback when 
// //user submits summary again