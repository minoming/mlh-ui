import React from 'react';
import { AutoGraphOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

const AnalyticsButton = ({ onClickHandler }) => {

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<AutoGraphOutlined />}
      style={{ borderRadius: '5px' }}
      // size="large"
      onClick={()=> {onClickHandler()}}
    >
      Analytics
    </Button>
  );
};

export default AnalyticsButton;
