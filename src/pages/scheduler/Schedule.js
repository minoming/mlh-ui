import React, {useEffect} from 'react'
import axios from 'axios'
import {DataGrid} from '@mui/x-data-grid'
import {Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {applicationConfigState} from '../../config/atoms/ApplicationAtom'
import {useRecoilValue, useRecoilState} from 'recoil'
import {schedulersState} from './atoms/SchedulerAtom'
import {openPopupState, schedulerInfoState} from './atoms/SchedulerPopupAtom'
import {SchedulerPopup} from './components/SchedulerPopup'
import useSchedulerService from './services/schedulerService'

const Schedule = () => {
  const applicationConfig = useRecoilValue(applicationConfigState)
  const [schedulers, setSchedulers] = useRecoilState(schedulersState)
  const [openPopup, setOpenPopup] = useRecoilState(openPopupState)
  const [schdulerInfo, setSchedulerInfo] = useRecoilState(schedulerInfoState)
  const {getSchedulers, patchScheduler} = useSchedulerService()
  let checkedSchedulerIDs = []

  useEffect(() => {
    initScheduler()
  }, [])

  const initScheduler = async () => {}

  const columns = [
    // {field: 'id', headerName: 'ID', width: 60},
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
      field: 'cronExpression',
      headerName: '주기',
      width: 120,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Created Time',
      description: 'This column has a value getter and is not sortable.',
      width: 200,
      editable: false
    }
  ]

  const handleRowSelection = (rowSelectionModel, details) => {
    checkedSchedulerIDs = rowSelectionModel
  }

  const handleSearch = async () => {
    let data = {
      params: {
        limit: '300'
      }
    }

    const response = await getSchedulers(data)
    setSchedulers(response.list)
  }

  const handleCreate = () => {
    setOpenPopup(true)
  }

  const handleDelete = () => {}

  const handleSetStatus = async (event) => {
    const data = {
      status: event.currentTarget.name === 'running' ? 'running' : 'stopped'
    }
    const promises = checkedSchedulerIDs.map((id) => {
      return patchScheduler(id, data)
    })

    try {
      const responses = await Promise.all(promises)
      setSchedulers((prevSchedulers) =>
        prevSchedulers.map((scheduler) => {
          const updatedScheduler = responses.find(
            (res) => res.data.content.id === scheduler.id
          )
          return updatedScheduler
            ? {...scheduler, ...updatedScheduler.data.content}
            : scheduler
        })
      )
    } catch (error) {
      console.error('Error updating some schedulers:', error)
    }
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
          onClick={handleSearch}
          variant='contained'
        >
          <span>조회</span>
        </LoadingButton>
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
          name='running'
          size='small'
          color='secondary'
          onClick={handleSetStatus}
          variant='contained'
        >
          <span>시작</span>
        </LoadingButton>
        <LoadingButton
          name='stopped'
          size='small'
          color='secondary'
          onClick={handleSetStatus}
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
      <SchedulerPopup />
    </div>
  )
}

export default Schedule
