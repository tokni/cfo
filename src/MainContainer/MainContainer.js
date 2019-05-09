import Drawer from './Drawers/Drawer'
import Header from '../MainContainer/HeaderContainer/Header'
import StoreContainer from './StoreContainer/StoreContainer'
import React, { Fragment } from 'react'
import { ContentContainer } from './ContentContainer/ContentContainer'
import { Grid } from '@material-ui/core'

export const MainContainer = () => (
  <Fragment>
    <StoreContainer />
    <Grid container lg={12}>
      <Grid lg={12} sm={12}>
        <Header />
      </Grid>
      <Grid lg={2} md={4} sm={4}>
        <Drawer />
      </Grid>
      <Grid lg={9} md={8} sm={7}>
        <ContentContainer />
      </Grid>
    </Grid>
  </Fragment>
)
