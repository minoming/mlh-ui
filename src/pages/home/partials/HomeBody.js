import AuditField from './components/AuditField'
import AuditMessage from './components/AuditMessage'
import AuditTab from './AuditTab'

const HomeBody = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
          alignItems: 'center',
          rowGap: '10px'
        }}
      >
        <AuditMessage></AuditMessage>
        <AuditField></AuditField>
      </div>
      <AuditTab></AuditTab>
    </>
  )
}

export default HomeBody
