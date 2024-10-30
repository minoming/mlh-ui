import {atom} from 'recoil'

export const schedulersState = atom({
  key: 'schedulersState',
  default: []
})

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false
})
