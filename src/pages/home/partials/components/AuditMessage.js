import Alert from '@mui/material/Alert'
import {useRecoilValue} from 'recoil'
import {
  showAuditMessageState,
  auditStatusState,
  auditMessageState,
} from '../../atoms/HomeAtom'

const AuditMessage = () => {
  const showAuditMessage = useRecoilValue(showAuditMessageState)
  const auditMessageStatus = useRecoilValue(auditStatusState)
  const auditMessage = useRecoilValue(auditMessageState)

  return (
    <>
      {showAuditMessage ? (
        <Alert severity={auditMessageStatus}>
          <strong>{auditMessage}</strong>
        </Alert>
      ) : null}
    </>
  )
}

export default AuditMessage
