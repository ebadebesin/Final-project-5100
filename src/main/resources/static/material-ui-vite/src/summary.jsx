




// import React, { useState } from 'react';
// import { 
//   Box, 
//   Paper, 
//   Typography, 
//   TextField, 
//   Button, 
//   Card,
//   CardContent,
//   IconButton,
//   Alert
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
// import TopBar from './Components/TopBar';
// import { useLocation } from "react-router-dom";
// import { useArticles } from "./Hooks/UseArticles";

// const SummaryComponent = () => {
//   const [summary, setSummary] = useState('');
//   const [feedback, setFeedback] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Extract article ID from the URL
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const articleId = queryParams.get('id');

//   // Fetch article using React Query
//   const { getById } = useArticles();
//   const { data: article, isLoading, isError } = getById(articleId);

//   const handleSubmit = async () => {
//     setFeedback(null);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:8080/api/summaries/evaluate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           articleId: article?.id,
//           originalText: article?.text,
//           userSummary: summary,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to evaluate summary');
//       }

//       const result = await response.json();
//       setFeedback(result);
//     } catch (error) {
//       console.error('Error submitting summary:', error);
//       setError(error.message || 'An error occurred while evaluating your summary');
//     }
//   };

//   const handleTryAgain = () => {
//     setSummary('');
//     setFeedback(null);
//     setError(null);
//   };

//   const handleClose = () => {
//     navigate(-1);
//   };

//   if (isLoading) {
//     return <Typography>Loading article...</Typography>;
//   }

//   if (isError || !article) {
//     return <Alert severity="error">Failed to load the article. Please try again later.</Alert>;
//   }

//   return (
//     <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, position: 'relative' }}>
//       <TopBar title="Summarize" />
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
//           Read the Article - {article.title}
//         </Typography>
//         <Typography paragraph>
//           {article.text.split('. ')[0] + '.'}
//         </Typography>
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
//             disabled={!summary.trim() || feedback}
//           >
//             Submit Summary
//           </Button>
//           <Button 
//             variant="outlined" 
//             onClick={() => navigate(-1)}
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
//             <Typography paragraph>
//               {feedback.feedback}
//             </Typography>
//             <Button 
//               variant="outlined" 
//               onClick={handleTryAgain}
//               sx={{ marginTop: 2 }}
//             >
//               Try Again
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ marginTop: 3 }}>
//           {error}
//         </Alert>
//       )}
//     </Box>
//   );
// };

// export default SummaryComponent;







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
// import TopBar from './Components/TopBar';
// import { useLocation } from "react-router-dom";
// import { useArticles } from "./Hooks/UseArticles";


// const SummaryComponent = () => {
//   const [summary, setSummary] = useState('');
//   const [feedback, setFeedback] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [article, setArticle] = useState(null);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const articleId = queryParams.get('id');

//   const { getById } = useArticles();
//   const navigate = useNavigate();
 
//   // Fetch article on component mount
//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/articles/id/${articleId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch article");
//         }
//         const data = await response.json();
//         setArticle(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchArticle();
//   }, [articleId]);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:8080/api/summaries/evaluate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           articleId: article?.id,
//           originalText: article?.text,
//           userSummary: summary,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to evaluate summary');
//       }

//       const result = await response.json();
//       setFeedback(result);
//     } catch (error) {
//       console.error('Error submitting summary:', error);
//       setError(error.message || 'An error occurred while evaluating your summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTryAgain = () => {
//     setSummary('');
//     setFeedback(null);
//     setError(null);
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

//       {error && (
//         <Alert severity="error" sx={{ marginBottom: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {article ? (
//         <>
//           <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Read the Article - {article.title}
//             </Typography>
//             <Typography paragraph>
//               {article.text.split('. ')[0] + '.'}
//             </Typography>
//           </Paper>

//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Write Your Summary
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               value={summary}
//               onChange={(e) => setSummary(e.target.value)}
//               placeholder="Enter your summary here..."
//               sx={{ marginBottom: 2 }}
//             />
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <Button 
//                 variant="contained" 
//                 onClick={handleSubmit}
//                 disabled={loading || !summary.trim() || feedback}
//               >
//                 {loading ? 'Submitting...' : 'Submit Summary'}
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 onClick={() => navigate(-1)}
//               >
//                 Try Later
//               </Button>
//             </Box>
//           </Paper>
//         </>
//       ) : (
//         <Typography variant="h6">Loading article...</Typography>
//       )}

//       {feedback && (
//         <Card sx={{ marginTop: 3, padding: 2 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Score: {feedback.score}/10
//             </Typography>
//             <Typography paragraph>
//               {feedback.feedback}
//             </Typography>
//             <Button 
//               variant="outlined" 
//               onClick={handleTryAgain}
//               sx={{ marginTop: 2 }}
//             >
//               Try Again
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default SummaryComponent;



import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from './Components/TopBar'
import BottomNavBar from './Components/BottomNavBar'
import { useArticles } from "./Hooks/UseArticles";

const SummaryComponent = () => {
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { articleId } = useParams(); // Access article ID from URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
        if (articleId) {
          try {
            const response = await fetch(`http://localhost:8080/api/articles/id/${articleId}`);
            if (!response.ok) {
              throw new Error("Failed to fetch article");
            }
            const articleData = await response.json();
            console.log("Fetched article:", articleData);
            setArticle(articleData);
          } catch (error) {
            console.error("Error fetching article:", error.message);
            setError(error.message || "Error fetching article");
          }
        }
      };
    //         const response = await fetch(`http://localhost:8080/api/articles/latest`);
    //         const articleData = await response.json();
    //         setArticle(articleData);
    //     }
    // };

    fetchArticle();
}, [articleId]);


  const previewText = article?.content 
    ? article.content.split('\n').slice(0, 1).join('\n') 
    : 'Loading article...';

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/summaries/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: article.id,
          originalText: article.content,
          userSummary: summary,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to evaluate summary');
      }

      const result = await response.json();
      
      if (result && result.score != null && result.feedback) {
        setFeedback(result);

      } else {
        throw new Error("Unexpected response structure from backend.");
      }
    } catch (error) {
      console.error('Error submitting summary:', error);
      setError(error.message || 'An error occurred while evaluating your summary');
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setSummary('');
    setFeedback(null);
    setError(null);
  };

  const handleTryLater = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, position: 'relative' }}>
      <TopBar title="Summarize"></TopBar>
      <IconButton 
        onClick={handleClose} 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          color: 'grey.600', 
          bgcolor: 'white', 
          borderRadius: '50%',
          boxShadow: 1,
        }}
        size="large"
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          {article.title}
        </Typography>
        <Typography paragraph>
          {previewText}
          {/* {article?.content} */}
        </Typography>
      </Paper>

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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={loading || !summary.trim() || feedback}
          >
            {loading ? 'Submitting...' : 'Submit Summary'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleTryLater}
          >
            Try Later
          </Button>
        </Box>
      </Paper>

      {feedback && (
        <Card sx={{ marginTop: 3, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Score: {feedback.score}/10
            </Typography>
            <Typography paragraph>
              {feedback.feedback}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleTryAgain}
              sx={{ marginTop: 2 }}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}


      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SummaryComponent;
