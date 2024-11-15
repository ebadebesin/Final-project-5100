import React, { useState } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import TopBar from './Components/TopBar'
import BottomNavBar from './Components/BottomNavBar'

const SummaryComponent = () => {
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const article = {
    id: 1,
    text: `CNN — Before Election Day has even arrived, the “Stop the Steal” movement has reemerged in force, with some of the same activists who tried to overturn former President Donald Trump’s 2020 loss outlining a step-by-step guide to undermine the results if he falls short again.

For months, those activists – who have been priming Trump supporters to believe the only way the former president can lose in 2024 is through fraud – have laid out proposals to thwart a potential Kamala Harris victory. Their plans include challenging results in court, pressuring.`
  };

  const previewText = article.text.split('. ')[0] + '.';

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/summaries/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: article.id,
          originalText: article.text,
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
        // setFeedback({
        //   score: result.score,
        //   conciseness: result.conciseness,
        //   clarity: result.clarity,
        //   length: result.length,
        //   readability: result.readability,
        // });

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
          Read the Article - Article name
        </Typography>
        <Typography paragraph>
          {previewText}
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
            {/* <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Conciseness:</strong> {feedback.conciseness}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Clarity:</strong> {feedback.clarity}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Length:</strong> {feedback.length}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Readability:</strong> {feedback.readability}
            </Typography> */}
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
