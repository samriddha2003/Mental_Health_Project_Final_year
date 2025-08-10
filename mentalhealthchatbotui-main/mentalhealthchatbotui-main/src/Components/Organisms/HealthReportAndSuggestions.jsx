import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomBox from '../Atoms/CustomBox';
import { HealthReport } from '../../Utils/Constant/Constant';
import allStore from '../../Utils/stores/allStore';

const HealthReportAndSuggestions = () => {
  const result = {
    Score: 50,
    Level: 3,
    Analysis: "Based on your responses, your current mental health status suggests a need for some attention and care. You are not alone in this feeling, and there are many resources available to help you. It's a good step that you've taken this assessment.",
    Recommendations: "Consider speaking with a mental health professional, such as a therapist or counselor. Practice mindfulness exercises daily, like meditation or deep breathing. Engage in light physical activity and ensure you are getting enough sleep. Connect with friends or family to build a strong support system.",
  };

  const { recommedations = {}} = allStore;
  return (
      <CustomBox>
        {/* Title/Header */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
            color: 'primary.main', // Use a theme color
            background: 'linear-gradient(45deg, #2196F3, #1976D2)', // Blue gradient
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {HealthReport?.labelAssesment}
        </Typography>

        {/* Score and Level */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Typography variant="body1">
            <strong>{HealthReport?.ScoreLabel}</strong> {recommedations?.score}/5
          </Typography>
          <Typography variant="body1">
            <strong>{HealthReport?.LevelLabel}</strong> {recommedations?.level}
          </Typography>
        </Box>

        {/* Analysis Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary', // Use a theme color for darker text
              mb: 1,
            }}
          >
            {HealthReport?.labelAnalysis}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {recommedations?.analysis}
          </Typography>
        </Box>

        {/* Recommendations Section */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 1,
            }}
          >
          {HealthReport?.RecommendationsLabel}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {recommedations?.recommendation}
          </Typography>
        </Box>
      </CustomBox>
  );
};

export default HealthReportAndSuggestions;