import React, { Fragment } from 'react';
import CustomButton from '../Atoms/CustomButton';
import { ButtonGroup } from '@mui/material';

const GroupedButtons = ({variant,handleOnClick,groupedbtnList,color}) => {
    return (
        <Fragment>
            <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                {groupedbtnList?.map((doctor) => (
                    <CustomButton
                        variant={variant}
                        value={doctor?.name}
                        handleOnClick={()=>handleOnClick(doctor)}
                        color={color}
                        docDetails={doctor?.experience}
                    />
                ))}
            </ButtonGroup>
        </Fragment>
    );
};

export default GroupedButtons;