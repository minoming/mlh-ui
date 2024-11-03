import {atom} from 'recoil'

export const schedulersState = atom({
  key: 'schedulersState',
  default: []
})

export const schedulerInfoState = atom({
  key: 'schedulerInfoState',
  default: {
    schedulerName: '',
    schedulerDescription: '',
    url: '',
    cronExpression: ''
  }
})

export const openPopupCreateSchedulerState = atom({
  key: 'openPopupCreateSchedulerState',
  default: false
})

export const requiredValueErrorState = atom({
  key: 'requiredValueErrorState',
  default: false
})
