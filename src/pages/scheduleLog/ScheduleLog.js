import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CondtionArea from './components/CondtionArea'
import ContentArea from './components/ContentArea'

const ScheduleLog = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: '#f5f5f5'
    }}> 
      <Box sx={{ display: 'flex', flex: '0 0 auto', justifyContent: 'center', alignItems: 'center', pt: '1vh'}}>
        <Typography variant="h6">Scheduler Log</Typography>
      </Box>
      <CondtionArea></CondtionArea>
      <ContentArea></ContentArea>
    </Box>
  )
}

export default ScheduleLog

