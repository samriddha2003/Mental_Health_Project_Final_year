import React, { Fragment } from 'react';
import { FormControlLabel, Radio } from '@mui/material';

const CustomRadioButton = ({buttonValue,onChange,label,selectedValue}) => {
    return (
        <Fragment>
            <FormControlLabel
            value={buttonValue}
            onChange={onChange}
            label={label}
            control={<Radio/>}
            checked={selectedValue===buttonValue}
            />
                
        </Fragment>
    );
};

export default CustomRadioButton;