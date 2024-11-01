import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { schedulerLogsState } from '../automs/SchedulerLogAtom';
import { useRecoilValue } from 'recoil';

const ContentArea = () => {
  const rows = useRecoilValue(schedulerLogsState)
  const columns = [
    // {field: 'id', headerName: 'ID', width: 60},
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false
    },
    {
      field: 'schedulerName',
      headerName: 'Scheduler Name',
      width: 300,
      editable: false
    },
    {
      field: 'message',
      headerName: 'Message',
      width: 600,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Created Time',
      width: 300,
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
        height: '65vh',
        bgcolor: '#f5f5f5',
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
        />
      </Paper>
    </Box>
  )
}

export default ContentArea
