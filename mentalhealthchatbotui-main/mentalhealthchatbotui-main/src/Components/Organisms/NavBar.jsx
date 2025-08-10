import React, { Fragment } from 'react';
import { Menu, MenuItem, Avatar, ListItemIcon, IconButton, Tooltip, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import CustomButton from '../Atoms/CustomButton';
import allStore from '../../Utils/stores/allStore';
import { useNavigate } from 'react-router-dom';


const NavBar = ({ handleMentalHealthOnclick, handleChatBotOnclick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setQuestionnarieValues = () => { },setSubmitQuestionarrie=()=>{},setLoginVal= () => { }, setRecommedations= () => { }
  ,setDocorList= () => { }
} = allStore;
const open = Boolean(anchorEl);
const navigate = useNavigate();
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

const handleLogout = () => {
  // navigate("/")
  // setQuestionnarieValues(null)

  // setSubmitQuestionarrie(null)

  // setLoginVal(null)

  // setRecommedations(null)

  // setDocorList(null)
}
return (
  <Fragment>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Align items with space between them
        padding: '10px 20px', // Add some padding
        background: 'linear-gradient(to right, #1a237e, #455a64)', // A dark gradient background
        color: 'white',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)', // Add a subtle shadow
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}> {/* Group the buttons together */}
        <CustomButton variant="outlined" value="Mental Health Test" handleOnClick={handleMentalHealthOnclick} />
        <CustomButton variant="outlined" value="ChatBot" handleOnClick={handleChatBotOnclick} />
      </Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, color: 'white' }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>M</Avatar>
        </IconButton>
      </Tooltip>
    </Box>
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  </Fragment>
);
};

export default NavBar;