// src/components/SummaryPractice.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const SummaryPractice = () => {
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();
  
  // Sample article - in a real app, this would come from your backend
  const article = {
    id: 1,
    text:
    `Testting 1-2-3.        
    Scientists have discovered a new species of deep-sea creature off the coast of Japan. 
    The organism, which lives at depths of over 1000 meters, exhibits bioluminescent properties never before seen in marine life. 
    This discovery could lead to new understanding of deep-sea ecosystems. CNN — Before Election Day has even arrived, the “Stop the Steal” movement has reemerged in force, with some of the same activists who tried to overturn former President Donald Trump’s 2020 loss outlining a step-by-step guide to undermine the results if he falls short again. 
    For months, those activists – who have been priming Trump supporters to believe the only way the former president can lose in 2024 is through fraud – have laid out proposals to thwart a potential Kamala Harris victory. 
    Their plans include challenging results in court, pressuring
    `
    
  };

  // Extract the first sentence or paragraph
  const previewText = article.text.split('. ')[0] + '.';

  const handleSubmit = async () => {
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
  
      const result = await response.json();
      setFeedback(result);
    } catch (error) {
      console.error('Error submitting summary:', error);
    }
  };

  const handleTryAgain = () => {
    setSummary('');
    setFeedback(null);
    navigate("/summary");
  };

  const handleTryLater = () => {
    setSummary('');
    setFeedback(null);
    navigate(-1);
  };

  const handleClose = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, position: 'relative' }}>
      {/* Close button */}
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
            disabled={!summary.trim() || feedback}
          >
            Submit Summary
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
        <Card sx={{ marginTop: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Score: {feedback.score}/100
            </Typography>
            <Typography paragraph>
              {feedback.feedback}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleTryAgain}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SummaryPractice;
