import {Search, Clear} from '@mui/icons-material'
import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker
} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import React, {useState} from 'react'
import {LoadingButton} from '@mui/lab'
import {isLoadingState} from '../../../automs/AppAtom'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import useSchedulerLogService from '../services/schedulerLogService'
import {schedulerLogsState} from '../automs/SchedulerLogAtom'

const ConditionArea = () => {
  const setSchedulerLogs = useSetRecoilState(schedulerLogsState)
  const isLoading = useRecoilValue(isLoadingState)
  const statusOptions = [
    {value: 'all', label: 'all'},
    {value: 'running', label: 'running'},
    {value: 'stopped', label: 'stopped'},
    {value: 'executed', label: 'executed'},
    {value: 'failed', label: 'failed'}
  ]

  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  )
  const [startTime, setStartTime] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  )
  const [endDate, setEndDate] = useState(new Date())
  const [endTime, setEndTime] = useState(
    new Date(new Date().setHours(23, 59, 59, 999))
  )
  const [schedulerName, setSchedulerName] = useState('')
  const [status, setStatus] = useState('all')
  const [message, setMessage] = useState('')
  const {getSchedulerLogs} = useSchedulerLogService()

  const handleDateChange = (name, newValue) => {
    name === 'start' ? setStartDate(newValue) : setEndDate(newValue)
  }

  const handleTimeChange = (name, newValue) => {
    name === 'start' ? setStartTime(newValue) : setEndTime(newValue)
  }

  const handleSchedulerName = (event) => {
    setSchedulerName(event.target.value)
  }
  const handleMessage = (event) => {
    setMessage(event.target.value)
  }
  const handleStatus = (event) => {
    setStatus(event.target.value)
  }

  const handleReset = () => {
    setStartDate(new Date(new Date().setDate(new Date().getDate() - 7)))
    setStartTime(new Date(new Date().setHours(0, 0, 0, 0)))
    setEndDate(new Date())
    setEndTime(new Date(new Date().setHours(23, 59, 59, 999)))
    setSchedulerName('')
    setStatus('all')
    setMessage('')
  }

  const handleSearch = async () => {
    const data = {
      startDate: formatDateTime(startDate, startTime),
      endDate: formatDateTime(endDate, endTime),
      schedulerName: schedulerName,
      status: status,
      message: message
    }

    const res = await getSchedulerLogs(data)

    if (res?.count > 0) {
      setSchedulerLogs(res.list)
    }
  }

  /**
   * 날짜랑 시간을 조합해준다
   * @param {*} dateValue
   * @param {*} timeValue
   * @returns
   */
  const formatDateTime = (dateValue, timeValue) => {
    if (dateValue && timeValue) {
      const combinedDateTime = new Date(dateValue)

      // 시간 값을 Date 객체에 설정
      combinedDateTime.setHours(timeValue.getHours())
      combinedDateTime.setMinutes(timeValue.getMinutes())
      combinedDateTime.setSeconds(timeValue.getSeconds() || 0) // seconds 기본값 0

      const year = combinedDateTime.getFullYear()
      const month = String(combinedDateTime.getMonth() + 1).padStart(2, '0')
      const day = String(combinedDateTime.getDate()).padStart(2, '0')
      const hours = String(combinedDateTime.getHours()).padStart(2, '0')
      const minutes = String(combinedDateTime.getMinutes()).padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}`
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        pt: '2vh',
        height: '25vh',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          p: '1vw'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: '2 0 auto',
              gap: 1,
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                sx={{width: 196}}
                label='Select Start Date'
                inputFormat='MM/dd/yyyy'
                value={startDate}
                onChange={(newValue) => {
                  handleDateChange('start', newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                sx={{width: 196}}
                label='Select Start Time'
                value={startTime}
                onChange={(newValue) => {
                  handleTimeChange('start', newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Typography sx={{pl: 1, pr: 1}}> ~ </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Select End Date'
                name='endDate'
                inputFormat='MM/dd/yyyy'
                value={endDate}
                onChange={(newValue) => {
                  handleDateChange('end', newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label='Select End Time'
                name='endTime'
                value={endTime}
                onChange={(newValue) => {
                  handleTimeChange('end', newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: '1 0 auto',
              gap: 2,
              flexDirection: 'row'
            }}
          >
            <TextField
              size='small'
              fullWidth
              value={schedulerName}
              label='Scheduler Name'
              variant='outlined'
              placeholder='Enter a scheduler name'
              sx={{
                width: '500px'
              }}
              onChange={handleSchedulerName}
            />
            <TextField
              size='small'
              fullWidth
              select
              label='Status'
              value={status}
              variant='outlined'
              sx={{
                width: '500px'
              }}
              onChange={handleStatus}
            >
              {statusOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  style={{fontSize: '12px', height: '32px'}}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size='small'
              fullWidth
              value={message}
              label='Message'
              variant='outlined'
              placeholder='Enter a message'
              onChange={handleMessage}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: '1 0 auto'
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'end'
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              startIcon={<Clear />}
              style={{borderRadius: '5px'}}
              onClick={handleReset}
            >
              Reset
            </Button>
            <LoadingButton
              loading={isLoading}
              loadingPosition='start'
              variant='contained'
              color='primary'
              startIcon={<Search />}
              style={{borderRadius: '5px'}}
              onClick={handleSearch}
            >
              Search
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default ConditionArea
