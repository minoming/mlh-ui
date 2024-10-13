import * as React from 'react'
import HomeHeader from './partials/HomeHeader'
import HomeBody from './partials/HomeBody'
import HomeFooter from './partials/HomeFooter'

const home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        padding: '0px 50px 0px 50px',
        height: '100vh',
      }}
    >
      <HomeHeader></HomeHeader>
      <HomeBody></HomeBody>
      {/* <HomeFooter></HomeFooter> */}
    </div>
  )
}

export default home
