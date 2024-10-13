import {atom} from 'recoil'

export const serverStatusState = atom({
  key: 'sererStatusState',
  default: true
})

export const homeTitleState = atom({
  key: 'homeTitleState',
  default: 'Miracom Lighthouse⚡️'
})
export const loadingState = atom({
  key: 'loadingState',
  default: false
})
export const modeState = atom({
  key: 'modeState',
  default: 'desktop'
})

export const urlState = atom({
  key: 'urlState',
  default: 'https://airhorner.com'
})
