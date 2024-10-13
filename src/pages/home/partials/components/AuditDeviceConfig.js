import {useRecoilState} from 'recoil'
import {Radio, RadioGroup, FormControlLabel, FormLabel} from '@mui/material'
import {auditDeviceConfigState} from '../../atoms/HomeAtom'

export const AuditDeviceConfig = () => {
  const [deviceConfig, setDeviceConfig] = useRecoilState(auditDeviceConfigState)

  const handleChangeDeviceConfig = (event) => {
    const modeValue = event.target.value
    setDeviceConfig(modeValue)
  }

  return (
    <>
      <FormLabel id="demo-radio-buttons-group-label">Device</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={deviceConfig}
        onChange={handleChangeDeviceConfig}
      >
        <FormControlLabel value="desktop" control={<Radio />} label="Desktop" />
        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
      </RadioGroup>
    </>
  )
}
