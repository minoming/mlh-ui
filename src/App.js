import './App.css'
import yaml from 'js-yaml'
import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Box, CircularProgress, CssBaseline, Typography } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  applicationConfigState,
  applicationLoadingState
} from './config/atoms/ApplicationAtom'
import SideMenu from './components/SideMenu';
import Analytics from './pages/analytics/Analytics'
import Schedule from './pages/scheduler/Schedule';
import ScheduleLog from './pages/scheduleLog/ScheduleLog';
import { isAnalyticsLoadingState } from './automs/AppAtom'

function App() {
  const [applicationConfig, setApplicationConfig] = useRecoilState(
    applicationConfigState
  )
  const [applicationLoading, setApplicationLoading] = useRecoilState(
    applicationLoadingState
  )

  const isAnalyticsLoading = useRecoilValue(isAnalyticsLoadingState)

  useEffect(() => {
    fetchApplictionConfig()
  }, [])

  const fetchApplictionConfig = async () => {
    try {
      const response = await fetch('/config/Application.yaml')
      const yamlText = await response.text()
      const yamlData = yaml.load(yamlText)

      // 환경에 따라 설정을 가져옴
      const env = process.env.NODE_ENV || 'development'
      setApplicationConfig(yamlData[env])
      setApplicationLoading(false) //application loading 완료
    } catch (error) {
      console.error('YAML 파일을 가져오는 중 오류 발생:', error)
    }
  }

  if (applicationLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 0, position: 'relative' }}>
        <Box sx={{ flexGrow: 1, p: 0 }}>
          <Routes>
            <Route path="/home" element={<Typography>홈 화면</Typography>} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/scheduler" element={<Schedule />} />
            <Route path="/schedulerlog" element={<ScheduleLog />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Box>
        {isAnalyticsLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1000,
            }}
          >
            <img src="loading.gif"></img>
            {/* <img src="https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif?cid=790b76116jb5j9308ogg40lpdgxxwp2lj8p5ftya7upzupn9&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Loading..." /> */}
            {/* <CircularProgress color="success" /> */}
          </Box>
        )}
      </Box>
    </Box>
  )  
}

export default App