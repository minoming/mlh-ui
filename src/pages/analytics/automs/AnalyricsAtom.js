import {atom} from 'recoil'

export const urlState = atom({
  key: 'urlState',
  default: "https://airhorner.com"
})

export const analyticsReportState = atom({
  key: 'analyticsReportState',
  default: '<h1>분석 대기중 ⚡️<h1>'

})