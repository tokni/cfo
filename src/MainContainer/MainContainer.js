import React, { Fragment } from 'react'
import Header from '../MainContainer/HeaderContainer/Header'
import { ContentContainer } from './ContentContainer/ContentContainer'
import StoreContainer from './StoreContainer/StoreContainer'
import Drawer from './Drawers/Drawer'
import { Grid } from '@material-ui/core'

export const MainContainer = () => (
  <Fragment>
    <StoreContainer />

    <Grid container lg={12}>
      <Grid lg={12}>
        <Header />
      </Grid>
      <Grid lg={2}>
        <Drawer />
      </Grid>
      <Grid md={9}>
        <ContentContainer />
      </Grid>
      {/* </Grid> */}
    </Grid>
  </Fragment>
)
