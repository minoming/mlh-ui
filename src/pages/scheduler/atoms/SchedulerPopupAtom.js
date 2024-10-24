import {atom} from 'recoil'

export const openPopupState = atom({
  key: 'openPopupState',
  default: false
})

export const schedulerInfoState = atom({
  key: 'schedulerInfoState',
  default: {
    schedulerName: "",
    schedulerDescription: "",
    cronExpression: "0 0 * * *"
  }
})

export const requiredValueErrorState = atom({
  key: 'requiredValueErrorState',
  default: false
})