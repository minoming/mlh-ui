import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {LoadingButton} from '@mui/lab'
import {Clear, Search} from '@mui/icons-material'
import {Box, Button, MenuItem, Paper, TextField} from '@mui/material'
import {schedulersState} from '../atoms/SchedulerAtom'
import {isLoadingState} from '../../../automs/AppAtom'
import useSchedulerService from '../services/schedulerService'

const ConditionArea = forwardRef((props, ref) => {
  const isLoading = useRecoilValue(isLoadingState)
  const searchButtonRef = useRef()
  const [schedulers, setSchedulers] = useRecoilState(schedulersState)
  const {getSchedulers} = useSchedulerService()
  const [schedulerName, setSchedulerName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('all')
  const statusOptions = [
    {value: 'all', label: 'all'},
    {value: 'running', label: 'running'},
    {value: 'stopped', label: 'stopped'}
  ]
  useImperativeHandle(ref, () => ({
    search: () => {
      searchButtonRef.current.click()
    }
  }))
  const handleSchedulerName = (event) => {
    setSchedulerName(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleStatus = (event) => {
    setStatus(event.target.value)
  }
  const handleReset = () => {
    setSchedulerName('')
    setDescription('')
    setStatus('all')
  }
  const handleSearch = async () => {
    const data = {
      name: schedulerName,
      description: description,
      status: status,
      url: ''
    }
    const response = await getSchedulers(data)
    setSchedulers(response.list)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        pt: '2vh',
        height: '18vh',
        width: '100%',
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
            gap: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2
            }}
          >
            <TextField
              size='small'
              fullWidth
              select
              label='Status'
              value={status}
              variant='outlined'
              sx={{
                display: 'flex',
                flex: 1
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
              value={schedulerName}
              label='Scheduler Name'
              variant='outlined'
              placeholder='Enter a scheduler name'
              sx={{
                display: 'flex',
                flex: 2
              }}
              onChange={handleSchedulerName}
            />
            <TextField
              size='small'
              fullWidth
              value={description}
              label='Description'
              variant='outlined'
              placeholder='Enter a scheduler description'
              sx={{
                display: 'flex',
                flex: 2
              }}
              onChange={handleDescription}
            />
          </Box>
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
              ref={searchButtonRef}
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
})

export default ConditionArea
