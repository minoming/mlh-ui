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
      width: 100,
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'end'
        }}>
          <Button
            size='small'
            variant="outlined"
            color="primary"
            style={{ borderRadius: '5px' }}
            onClick={() => { }}
          >
            New
          </Button>
          <Button
            size='small'
            variant="outlined"
            style={{ borderRadius: '5px', color: '#FFA500', borderColor: '#FFA500'}}
            onClick={() => { }}
          >
            Modify
          </Button>
          <LoadingButton
            loading
            loadingPosition='start'
            size='small'
            variant="outlined"
            color="secondary"
            style={{ borderRadius: '5px' }}
            onClick={() => { }}
          >
            Delete
          </LoadingButton>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[10]}
          checkboxSelection
        />
      </Paper>
    </Box>
  )
}

export default ContentArea
