import {Box, Paper} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import React from 'react'
import {schedulerLogsState} from '../automs/SchedulerLogAtom'
import {useRecoilValue} from 'recoil'

const ContentArea = () => {
  const rows = useRecoilValue(schedulerLogsState)
  const columns = [
    // {field: 'id', headerName: 'ID', width: 60},
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      editable: false
    },
    {
      field: 'schedulerName',
      headerName: 'Scheduler Name',
      flex: 2,
      editable: false
    },
    {
      field: 'message',
      headerName: 'Message',
      flex: 4,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Created Time',
      flex: 1,
      editable: false
    }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        p: 1,
        pt: 0,
        height: '70vh',
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
        <Box sx={{display: 'flex', flex: '1 0 auto', width: '100%'}}>
          {' '}
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100
                }
              }
            }}
            pageSizeOptions={[100]}
            sx={{
              width: '100%',
              flex: 1,
              overflow: 'auto'
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default ContentArea
