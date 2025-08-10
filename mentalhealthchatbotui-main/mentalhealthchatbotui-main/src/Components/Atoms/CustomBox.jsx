import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CustomBox = ({ questionIndex, eachQuestions, children }) => {
  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Take up the full height of the parent container
      }}
    >
      <Box
        sx={{
          bgcolor: '#f5f5f5', // Lighter background color
          p: 4, // Padding
          borderRadius: 2, // Rounded corners
          boxShadow: 3, // Add a shadow for depth
          width: '100%',
          maxWidth: '600px', // Max width for better readability
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3, // Spacing between children
        }}
      >
        {eachQuestions?
        <Typography
          variant="h6" // Use a typography variant for semantic styling
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333', // Darker text color
          }}
        >
         {`${questionIndex + 1}. ${eachQuestions}`}
        </Typography>: null}
        {children}
      </Box>
    </Container>
  );
};

export default CustomBox;