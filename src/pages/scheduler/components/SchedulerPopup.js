import {useRecoilState} from 'recoil'
import {
  openPopupState,
  schedulerInfoState,
  requiredValueErrorState
} from '../atoms/SchedulerPopupAtom'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material'
import useSchedulerService from '../services/schedulerService'

export const SchedulerPopup = () => {
  const [openPopup, setOpenPopup] = useRecoilState(openPopupState)
  const [schedulerInfo, setSchedulerInfo] = useRecoilState(schedulerInfoState)
  const [requiredValueError, setRequiredValueError] = useRecoilState(
    requiredValueErrorState
  )
  const {postScheduler} = useSchedulerService()

  const handleClose = () => {
    setOpenPopup(false)
  }

  const handleSave = async () => {
    try {
      const newScheduler = await postScheduler(schedulerInfo)
      console.log(newScheduler)
    } catch (error) {}
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setSchedulerInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>스케줄러 생성</DialogTitle>
        <DialogContent style={{width: '500px', height: '300px'}}>
          <TextField
            autoFocus
            margin='dense'
            label='스케줄러 이름'
            name='schedulerName'
            type='text'
            fullWidth
            variant='outlined'
            value={schedulerInfo?.schedulerName}
            onChange={handleChange}
            required
            error={requiredValueError}
            helperText={requiredValueError ? '이 필드는 필수입니다.' : ''}
          />
          <TextField
            autoFocus
            margin='dense'
            label='스케줄러 설명'
            name='schedulerDescription'
            type='text'
            fullWidth
            variant='outlined'
            value={schedulerInfo?.schedulerDescription}
            onChange={handleChange}
          />
          <FormControl fullWidth variant='outlined' margin='dense'>
            <InputLabel required id='cron-expression-select-label'>
              스케줄러 주기(Cron Expression)
            </InputLabel>
            <Select
              labelId='cron-expression-select-label'
              label='스케줄러 주기(Cron Expression)'
              name='cronExpression'
              fullWidth
              value={schedulerInfo.cronExpression}
              onChange={handleChange}
            >
              <MenuItem value=''></MenuItem>
              <MenuItem value={'* * * * *'}>매분</MenuItem>
              <MenuItem value={'0 0 * * *'}>매일 00시</MenuItem>
              <MenuItem value={'0 0 * * 1'}>월요일 00시</MenuItem>
              <MenuItem value={'0 0 * * 2'}>화요일 00시</MenuItem>
              <MenuItem value={'0 0 * * 3'}>수요일 00시</MenuItem>
              <MenuItem value={'0 0 * * 4'}>목요일 00시</MenuItem>
              <MenuItem value={'0 0 * * 5'}>금요일 00시</MenuItem>
              <MenuItem value={'0 0 * * 6'}>토요일 00시</MenuItem>
              <MenuItem value={'0 0 * * 7'}>일요일 00시</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            취소
          </Button>
          <Button onClick={handleSave} color='primary'>
            생성
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
