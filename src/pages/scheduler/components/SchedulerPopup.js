import {useRecoilState} from 'recoil'
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
import {
  requiredValueErrorState,
  schedulerInfoState
} from '../atoms/SchedulerAtom'

export const SchedulerPopup = ({open, onClose}) => {
  const [schedulerInfo, setSchedulerInfo] = useRecoilState(schedulerInfoState)
  const [requiredValueError, setRequiredValueError] = useRecoilState(
    requiredValueErrorState
  )
  const {postScheduler} = useSchedulerService()

  const handleSave = async () => {
    try {
      const newScheduler = await postScheduler(schedulerInfo)
      onClose(true)
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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Scheduler</DialogTitle>
        <DialogContent style={{width: '500px', height: '300px'}}>
          <TextField
            autoFocus
            margin='dense'
            label='Scheduler Name'
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
            label='Scheduler Description'
            name='schedulerDescription'
            type='text'
            fullWidth
            variant='outlined'
            value={schedulerInfo?.schedulerDescription}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            label='URL'
            name='url'
            type='text'
            fullWidth
            variant='outlined'
            required
            value={schedulerInfo?.url}
            onChange={handleChange}
          />
          <FormControl fullWidth variant='outlined' margin='dense'>
            <InputLabel required id='cron-expression-select-label'>
              Frequency(Cron Expression)
            </InputLabel>
            <Select
              labelId='cron-expression-select-label'
              label='스케줄러 주기(Cron Expression)'
              name='cronExpression'
              fullWidth
              value={schedulerInfo.cronExpression}
              onChange={handleChange}
            >
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
          <Button inert onClick={() => onClose(false)} color='black'>
            Cancel
          </Button>
          <Button inert onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
