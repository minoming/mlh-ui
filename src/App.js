import './App.css'
import {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import yaml from 'js-yaml'

import Home from './pages/home/Home'
import Schedule from './pages/scheduler/Schedule'
import {
  applicationConfigState,
  applicationLoadingState
} from './config/atoms/ApplicationAtom'

function App() {
  const [applicationConfig, setApplicationConfig] = useRecoilState(
    applicationConfigState
  )
  const [applicationLoading, setApplicationLoading] = useRecoilState(
    applicationLoadingState
  )

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
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/scheduler' element={<Schedule />} />
    </Routes>
  )
}

export default App
