import * as React from 'react'
import {styled} from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MenuContent from './MenuContent'

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box'
  }
})

export default function SideMenu() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        display: {xs: 'none', md: 'block'},
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5
        }}
      >
        <Avatar
          sizes='small'
          alt='Miracom LightHouse'
          src='favicon.ico'
          sx={{width: 36, height: 36}}
        />
        <Typography
          variant='body1'
          sx={{paddingLeft: '10px', fontWeight: 600, lineHeight: '16px'}}
        >
          Miracom Lighthouse
        </Typography>
      </Box>
      <Divider />
      <MenuContent />
      <Stack
        direction='row'
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{mr: 'auto'}}>
          <Typography
            variant='body2'
            sx={{fontWeight: 500, lineHeight: '16px'}}
          >
            Technology Research
          </Typography>
          <Typography variant='caption' sx={{color: 'text.secondary'}}>
            Copyright ©Miracom Inc Co., Ltd. All rights reserved.
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  )
}
