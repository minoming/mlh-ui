import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Box, Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  openPopupCreateSchedulerState,
  schedulersState,
  schedulerInfoState
} from '../atoms/SchedulerAtom'
import { LoadingButton } from '@mui/lab'
import useSchedulerService from '../services/schedulerService'

const ContentArea = (props) => {
  const handleSearch = props.onSearch
  const { patchScheduler, deleteScheduler } = useSchedulerService()
  const setOpenPopupCreateScheduler = useSetRecoilState(
    openPopupCreateSchedulerState
  )
  const setSchedulerInfo = useSetRecoilState(schedulerInfoState)
  const rows = useRecoilValue(schedulersState)

  const columns = [
    // {field: 'id', headerName: 'ID', width: 60},
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      editable: false,
      renderCell: (params) => {
        const color = params.value === 'running' ? '#4caf50' : '#f44336'
        return (
          <div style={{ color: color }}>{params.value}</div>
        )
      }
    },
    {
      field: 'name',
      headerName: 'Scheduler Name',
      flex: 2,
      editable: false
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      editable: false
    },
    {
      field: 'url',
      headerName: 'URL',
      flex: 3,
      editable: false
    },
    {
      field: 'cronExpression',
      headerName: 'Cron Expression',
      flex: 1.2,
      editable: false
    },
    {
      field: 'lastExecutionTime',
      headerName: 'Last Execution Time',
      flex: 2,
      editable: false
    }
  ]
  const [selectionRow, setSelectionRow] = useState([])
  const handleSelectionChange = (newSelection) => {
    setSelectionRow(newSelection)
  }

  const handleCreate = () => {
    setSchedulerInfo({
      schedulerName: '',
      schedulerDescription: '',
      url: 'https://airhorner.com',
      cronExpression: '0 0 * * *'
    })
    setOpenPopupCreateScheduler(true)
  }
  const handleUpdate = () => { }
  const handleDelete = async () => {
    const response = await deleteScheduler(selectionRow?.id)
    handleSearch(true)
  }

  const handleSetStatus = async (event) => {
    const buttonName = event.currentTarget.name

    if (!selectionRow || !buttonName) {
      return
    }

    const data = {
      status: event.currentTarget.name
    }

    const response = await patchScheduler(selectionRow.id, data)
    handleSearch(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        p: 1,
        pt: 0,
        height: '77vh',
        width: '100%',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          p: '1vw',
          gap: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            flex: '1 0 auto',
            width: '100%',
            height: '100%',
            gap: 1
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <LoadingButton
                name='running'
                size='small'
                variant='outlined'
                color='success'
                onClick={handleSetStatus}
              >
                <span>Start</span>
              </LoadingButton>
              <LoadingButton
                name='stopped'
                size='small'
                variant='outlined'
                color='error'
                onClick={handleSetStatus}
              >
                <span>Stop</span>
              </LoadingButton>
            </Box>
            <Box sx={{ display: 'flex', flex: 1 }}></Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button
                size='small'
                color='primary'
                onClick={handleCreate}
                variant='outlined'
              >
                <span>Create</span>
              </Button>
              <Button
                size='small'
                color='success'
                onClick={handleUpdate}
                variant='outlined'
              >
                <span>Update</span>
              </Button>
              <LoadingButton
                size='small'
                color='warning'
                onClick={handleDelete}
                variant='outlined'
              >
                <span>Delete</span>
              </LoadingButton>
            </Box>
          </Box>
          <DataGrid
              rows={rows}
              columns={columns}
              // checkboxSelection
              onRowClick={handleSelectionChange}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 100
                  }
                }
              }}
              pageSizeOptions={[100]}
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                flex: 1,
              }}
            />
        </Box>
      </Paper>
    </Box>
  )
}

export default ContentArea
