import {useRecoilValue} from 'recoil'
import Typography from '@mui/material/Typography'
import {homeTitleState} from '../atoms/HomeAtom'

const HomeHeader = () => {
  const homeTitle = useRecoilValue(homeTitleState)

  return (
    <>
      <Typography variant="h3" style={{marginBottom: '50px'}}>
        {homeTitle}
      </Typography>
    </>
  )
}

export default HomeHeader
