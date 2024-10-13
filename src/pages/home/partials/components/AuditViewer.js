import React from 'react'
import ReportViewer from 'react-lighthouse-viewer'

const AuditViewer = () => {
  return <ReportViewer json={jsonReport} />
}

export default AuditViewer
