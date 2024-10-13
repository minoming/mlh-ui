import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography'
import * as Utils from '../utils/Utils';
import axios from 'axios';

const Tester = () => {
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState('desktop');
  const [url, setUrl] = React.useState('https://airhorner.com/');
  const [validURL, setValidURL] = React.useState(true);
  const [serverStatus, setServerStatus] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [htmlContent, setHtmlContent] = React.useState('');
  const title = 'Miracom Lighthouse⚡️'

  const handleTest = () => {
    /**URL 유효성 확인 */
    if (!Utils.urlVaildate(url) || url === '') {
      setValidURL(false)

    } else {
      setValidURL(true)
    }

    /** */
    setLoading(true)
    setServerStatus(true)
    setSuccess(false)

    axios.patch('http://127.0.0.1:18177/mlh', {
      mode: mode,
      url: url
    })
      .then((Response) => {
        console.log(Response.data)
        setLoading(false)
        setSuccess(true)
        setHtmlContent(Response.data.html)
      })
      .catch((Error) => {
        setServerStatus(false)
        setLoading(false)
      })
  }

  const handleChangeMode = (event) => {
    const modeValue = event.target.value;
    setMode(modeValue)
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
      padding: '50px'
    }}>
      <Typography variant="h3" style={{ marginBottom: '20px' }}>
        {title}
      </Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={mode}
        onChange={handleChangeMode}
      >
        <FormControlLabel value="desktop" control={<Radio />} label="Desktop" />
        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
      </RadioGroup>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField required id="outlined-basic" label="URL" onChange={(event) => {
          setUrl(event.target.value)
        }} value={url} variant="outlined" style={{ width: '500px', margin: '10px' }} />
        <LoadingButton
          size="small"
          color="secondary"
          onClick={handleTest}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          style={{ margin: '10px' }}
        >
          <span>점검</span>
        </LoadingButton>
      </div>
      {!validURL ? <Alert severity="error" style={{ width: '500px' }}>
        <strong>URL을 입력하거나 올바른 URL을 입력해주세요.</strong>
      </Alert> : null}
      {!serverStatus ? <Alert severity="error" style={{ width: '500px' }}>
        <strong>서버의 상태를 확인해주세요.</strong>
      </Alert> : null}
      {serverStatus && loading ? <Alert severity="info" style={{ width: '500px' }}>
        <strong>열심히 분석중입니다. 조금만 기다려주세요.</strong>
      </Alert> : null}
      {success ? <Alert severity="success" style={{ width: '500px' }}>
        <strong>분석이 완료되었습니다.</strong>
      </Alert> : null}
      <div>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  )
}

export default Tester;