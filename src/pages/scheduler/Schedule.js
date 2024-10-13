import * as React from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const Schedule = () => {
  const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''}`
    }
  ]

  const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 14},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 11},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65}
  ]

  const handleCreate = () => {}
  const handleDelete = () => {}
  const handleStart = () => {}
  const handleStop = () => {}

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
      <div style={{display: 'flex', flex: '0 0 38px', flexFlow: 'row nowrap'}}>
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
      <div style={{display: 'flex', flex: '0 0 auto'}}>
        <DataGrid
          rows={rows}
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
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default Schedule
