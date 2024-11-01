import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import UrlInput from './components/UrlInput'
import AnalyticsButton from './components/AnalyticsButton'
import AnalyticsViewer from './components/AnalyticsViewer'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { analyticsReportState, urlState } from './automs/AnalyricsAtom'
import useAnalyticsService from './services/AnalyticsService';

const Analytics = () => {
  const url = useRecoilValue(urlState)
  const setAnalyticsReportState = useSetRecoilState(analyticsReportState)
  const { postAnalytics } = useAnalyticsService()

  const handleAnalytics = async () => {
    
    const response = await postAnalytics(url, { 
      mode: 'mode',
      url: url
    })

    setAnalyticsReportState(response.data.report)

    console.log(url)
  }


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Box sx={{ display: 'flex', flex: '0 0 auto', justifyContent: 'center', alignItems: 'center', pt: '1vh'}}>
        <Typography variant="h6">UI Performance Analytics</Typography>
      </Box>
      <Box sx={{display: 'flex', flex: '0 0 20px', pl: 5, pr: 5, pt: '2vh', gap: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Box sx={{display: 'flex', flex: '1 0 auto'}}>
          <UrlInput></UrlInput>
        </Box>
        <AnalyticsButton onClickHandler={handleAnalytics}></AnalyticsButton>
      </Box>
      <AnalyticsViewer></AnalyticsViewer>
    </Box>
  )
}

export default Analytics
