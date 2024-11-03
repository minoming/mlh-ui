import {Box, Typography} from '@mui/material'
import React, {useEffect, useRef} from 'react'
import ConditionArea from './components/CondtionArea'
import ContentArea from './components/ContentArea'
import {openPopupCreateSchedulerState} from './atoms/SchedulerAtom'
import {useRecoilState} from 'recoil'
import {SchedulerPopup} from './components/SchedulerPopup'

const Scheduler = () => {
  const searchButtonRef = useRef()
  const [openPopupCreateScheduler, setOpenPopupCreateScheduler] =
    useRecoilState(openPopupCreateSchedulerState)
  const hanldePopupClose = (isSearch) => {
    setOpenPopupCreateScheduler(false)
    handleSearch(isSearch)
  }
  const handleSearch = (isSearch) => {
    if (isSearch) searchButtonRef.current.search()
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f5f5f5'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '0 0 auto',
          justifyContent: 'center',
          alignItems: 'center',
          pt: '1vh'
        }}
      >
        <Typography variant='h6'>Scheduler</Typography>
      </Box>
      <ConditionArea ref={searchButtonRef}></ConditionArea>
      <ContentArea onSearch={handleSearch}></ContentArea>

      <SchedulerPopup
        open={openPopupCreateScheduler}
        onClose={hanldePopupClose}
      />
    </Box>
  )
}

export default Scheduler
