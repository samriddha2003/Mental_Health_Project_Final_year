import React, { Fragment } from 'react';
import GroupedButtons from '../Molecules/GroupedButtons';
import { Box } from '@mui/material';
import allStore from '../../Utils/stores/allStore';

const DoctorDetails = () => {
  const { doctorList = [], recommedations = {} } = allStore;

  const handleOnClick = (item) => {
    // Your click handler logic here
  };

  return (
    <Fragment>
      {recommedations?.score < 4 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            // --- The key changes are below ---
            maxHeight: '1000px', // Adjust this value to fit 10 items
            overflowY: 'auto', // Add a vertical scrollbar when content overflows
            // --- End of changes ---
          }}
        >
          <GroupedButtons
            variant="outlined"
            groupedbtnList={doctorList} // Pass the full list to render all buttons
            handleOnClick={handleOnClick}
            color='#d21972ff'
          />
        </Box>
      )}
    </Fragment>
  );
};

export default DoctorDetails;