import React from 'react'
import {reportHTMLState} from '../../atoms/HomeAtom'
import {useRecoilState} from 'recoil'

const ReportViewer = () => {
  const [reportHTML, setReportHTML] = useRecoilState(reportHTMLState)
  const blob = new Blob([reportHTML], {type: 'text/html'})
  const url = URL.createObjectURL(blob)

  return <iframe src={url} width='100%' height='100%'></iframe>
}

export default ReportViewer
