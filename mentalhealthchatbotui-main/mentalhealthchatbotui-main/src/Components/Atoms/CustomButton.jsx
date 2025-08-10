import React from 'react';
import {Button,Typography} from '@mui/material';

const CustomButton=({value,variant,handleOnClick,color,docDetails}) => {
  console.log(docDetails)
  console.log(value)
    return(  
        <Button
        key={value}
        variant={variant}
        onClick={handleOnClick}
        sx={{
    color: color? color :'#E0E0E0',
    borderColor: '#E0E0E0',
    '&:hover': {
      borderColor: '#FFFFFF',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  }}
        >  <Typography variant="body1">
            <strong>{value}</strong><br></br>
            {docDetails?.level}
          </Typography>
        </Button>
        
    );
}

export default CustomButton;