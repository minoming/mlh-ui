import React from 'react';
import { Box, Paper } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { analyticsReportState } from '../automs/AnalyricsAtom';

const AnalyticsViewer = React.memo(() => {
  // const [reportHTML, setReportHTML] = useRecoilState(reportHTMLState)
  const reportHTML = useRecoilValue(analyticsReportState)
  
  const blob = new Blob([reportHTML], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '85vw',
          height: '85vh',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <iframe
          src={url}
          width='100%'
          height='100%'
          style={{ border: 'none' }}
          title="Analytics Report"
        ></iframe>
      </Paper>
    </Box>
  );
});

export default AnalyticsViewer;
