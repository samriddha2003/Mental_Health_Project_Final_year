import React, { Fragment } from 'react';
import {RadioGroup } from '@mui/material';
import CustomRadioButton from '../Atoms/CustomRadioButton';

const GroupedRadioButton = ({ handleChange,selectedValue }) => {
    
    const selectionOption=[{
        value: 5,
        selectionName: "Rarely or Not at All"
    },{
         value: 4,
        selectionName: "Occasionally"
    },{
         value: 3,
        selectionName: "Frequently"
    },{
         value: 2,
        selectionName: "Almost Always"
    },{
         value: 1,
        selectionName: "Constantly or Severe"
    },]
   
    return (
        <Fragment>
            <RadioGroup
                row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                // name="row-radio-buttons-group"
            >
                {selectionOption?.map((option)=>(
            <CustomRadioButton
             buttonValue={option?.value}
             label={option?.selectionName}
             onChange={()=>handleChange(option)}
             selectedValue ={selectedValue}
            /> 
                ))}

            </RadioGroup>
        </Fragment>
    );
};

export default GroupedRadioButton;