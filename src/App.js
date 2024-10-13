import './App.css'
import Home from './pages/home/Home'
import Schedule from './pages/scheduler/Schedule'
import {Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/scheduler' element={<Schedule />} />
      </Routes>
    </RecoilRoot>
  )
}

export default App
