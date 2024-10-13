import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import {useRecoilState} from 'recoil'
import axios from 'axios'
import {
  serverStatusState,
  urlState,
  auditModeState,
  loadingState,
  showAuditMessageState,
  auditStatusState,
  auditMessageState,
  reportHTMLState
} from '../../atoms/HomeAtom'

const AuditField = (event) => {
  const [serverStatus, setServerStatus] = useRecoilState(serverStatusState)

  const [url, setUrl] = useRecoilState(urlState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [showAuditMessage, setShowAuditMessage] = useRecoilState(
    showAuditMessageState
  )
  const [auditStatus, setAuditStatus] = useRecoilState(auditStatusState)
  const [auditMessage, setAuditMessage] = useRecoilState(auditMessageState)
  const [reportHTML, setReportHtml] = useRecoilState(reportHTMLState)

  const handleUrlChange = (event) => {
    const url = event.target.value
    setUrl(url)
  }

  const handleTest = () => {
    axios.post('http://127.0.0.1:18177/mlh', {}).then((response) => {
      console.log(response)
    })
  }

  const handleAudit = () => {
    if (url === '') {
      setShowAuditMessage(true)
      setAuditStatus('error')
      setAuditMessage('URL을 입력하거나 올바른 URL을 입력해주세요.')
      return
    }

    axios
      .patch('http://127.0.0.1:18177/mlh', {
        mode: 'mode',
        url: url
      })
      .then((Response) => {
        console.log(Response.data)
        setLoading(false)
        setShowAuditMessage(true)
        setAuditStatus('success')
        setAuditMessage('분석이 완료되었습니다.')
        setReportHtml(Response.data.report)
      })
      .catch((Error) => {
        setServerStatus(false)
        setLoading(false)
        setShowAuditMessage(true)
        setAuditStatus('error')
        setAuditMessage('서버의 상태를 확인해주세요.')
      })

    console.log(url)
  }
  return (
    <div style={{display: 'flex', columnGap: '10px'}}>
      <TextField
        required
        id='outlined-basic'
        label='URL'
        onChange={handleUrlChange}
        value={url}
        variant='outlined'
        style={{width: '500px'}}
      />
      <LoadingButton
        size='small'
        color='secondary'
        onClick={handleAudit}
        loading={loading}
        variant='contained'
      >
        <span>점검</span>
      </LoadingButton>
      <LoadingButton
        size='small'
        color='secondary'
        onClick={handleTest}
        variant='contained'
      >
        <span>테스트</span>
      </LoadingButton>
    </div>
  )
}

export default AuditField
