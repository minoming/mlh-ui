import { Typography } from "@mui/material"

const HomeFooter = () => {
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '30px',
      justifyContent: 'left',
      alignItems: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Typography variant="caption">
        Copyright ⓒ2023 Miracom Inc Co., Ltd. All rights reserved.
      </Typography>
    </div>
  )
}

export default HomeFooter