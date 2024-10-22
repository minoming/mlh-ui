import {atom} from 'recoil'

export const applicationConfigState = atom({
  key: 'applicationConfigState',
  default: null
})

export const applicationLoadingState = atom({
  key: 'applicationLoadingState',
  default: true
})
