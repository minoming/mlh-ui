import React, {useEffect} from 'react'
import axios from 'axios'
import {DataGrid} from '@mui/x-data-grid'
import {Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {applicationConfigState} from '../../config/atoms/ApplicationAtom'
import {useRecoilValue, useRecoilState} from 'recoil'
import {schedulersState} from './atoms/SchedulerAtom'

const Schedule = () => {
  const applicationConfig = useRecoilValue(applicationConfigState)
  const [schedulers, setSchedulers] = useRecoilState(schedulersState)
  let checkedSchedulerIDs = []

  useEffect(() => {
    initScheduler()
  }, [])

  const initScheduler = async () => {
    getSchedulers()
  }

  const getSchedulers = async () => {
    axios
      .get(applicationConfig?.service?.url + '/schedulers', {
        params: {
          limit: '300' // 쿼리 매개변수를 params 객체로 전달
        }
      })
      .then((Response) => {
        console.log(Response.data.list)
        setSchedulers(Response.data.list)
      })
      .catch((Error) => {
        // setServerStatus(false)
        // setLoading(false)
        // setShowAuditMessage(true)
        // setAuditStatus('error')
        // setAuditMessage('서버의 상태를 확인해주세요.')
        console.log(Error)
      })
  }

  const columns = [
    {field: 'id', headerName: 'ID', width: 60},
    {
      field: 'status',
      headerName: '상태',
      width: 100,
      editable: false
    },
    {
      field: 'name',
      headerName: '이름',
      width: 200,
      editable: false
    },
    {
      field: 'description',
      headerName: '설명',
      width: 300,
      editable: false
    },
    {
      field: 'cron_expression',
      headerName: '주기',
      width: 120,
      editable: false
    },
    {
      field: 'created_at',
      headerName: 'Created Time',
      description: 'This column has a value getter and is not sortable.',
      width: 200,
      editable: false
    }
  ]

  const handleRowSelection = (rowSelectionModel, details) => {
    checkedSchedulerIDs = rowSelectionModel
  }
  const handleCreate = () => {}
  const handleDelete = () => {}
  const handleStart = () => {
    checkedSchedulerIDs.forEach((id) => {
      axios
        .patch(applicationConfig?.service?.url + '/schedulers/start/' + id)
        .then((Response) => {
          console.log(Response)
          initScheduler()
        })
        .catch((Error) => {
          console.log(Error)
        })
    })
  }
  const handleStop = () => {
    checkedSchedulerIDs.forEach((id) => {
      axios
        .patch(applicationConfig?.service?.url + '/schedulers/stop/' + id)
        .then((Response) => {
          console.log(Response)
          initScheduler()
        })
        .catch((Error) => {
          console.log(Error)
        })
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        padding: '0px 50px 0px 50px',
        height: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: '0 0 38px',
          flexFlow: 'row nowrap',
          width: '100%',
          justifyContent: 'end'
        }}
      >
        <LoadingButton
          size='small'
          color='secondary'
          onClick={handleCreate}
          variant='contained'
        >
          <span>생성</span>
        </LoadingButton>
        <LoadingButton
          size='small'
          color='secondary'
          onClick={handleDelete}
          variant='contained'
        >
          <span>삭제</span>
        </LoadingButton>
        <LoadingButton
          size='small'
          color='secondary'
          onClick={handleStart}
          variant='contained'
        >
          <span>시작</span>
        </LoadingButton>
        <LoadingButton
          size='small'
          color='secondary'
          onClick={handleStop}
          variant='contained'
        >
          <span>중지</span>
        </LoadingButton>
      </div>
      <div style={{display: 'flex', flex: '1 0 auto', width: '100%'}}>
        <DataGrid
          rows={schedulers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          // disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
        />
      </div>
    </div>
  )
}

export default Schedule
