import {Tab, Box, Typography} from '@mui/material'
import {TabPanel, TabContext, TabList} from '@mui/lab'
import {tabValue} from '../atoms/HomeAtom'
import {useRecoilState} from 'recoil'
import {AuditDeviceConfig} from './components/AuditDeviceConfig'
import ReportViewer from './components/ReportViewer'

const AuditTab = () => {
  const [value, setValue] = useRecoilState(tabValue)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange}>
            <Tab label='설정' value='setup' />
            <Tab label='결과' value='result' />
          </TabList>
        </Box>
        <TabPanel value='setup'>
          <AuditDeviceConfig></AuditDeviceConfig>
        </TabPanel>
        <TabPanel value='result'>
          <Box sx={{height: '75vh'}}>
            <ReportViewer></ReportViewer>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default AuditTab
