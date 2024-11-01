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

export const urlState2 = atom({
  key: 'urlState2',
  default: 'https://airhorner.com'
})

export const tabValue = atom({
  key: 'tabValueState',
  default: 'setup'
})

/** Audit Config */
export const auditDeviceConfigState = atom({
  key: 'auditDeviceConfigState',
  default: 'desktop'
})

/** Alter Message */
export const showAuditMessageState = atom({
  key: 'showAuditMessageState',
  default: false
})
export const auditStatusState = atom({
  key: 'auditStatusState',
  default: 'success'
})
export const auditMessageState = atom({
  key: 'auditMessageState',
  default: ''
})

export const reportHTMLState = atom({
  key: 'reportHTMLState',
  default: ''
})
