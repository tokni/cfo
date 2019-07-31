  import Drawer from './Drawers/Drawer'
import Header from '../MainContainer/HeaderContainer/Header'
import StoreContainer from './StoreContainer/StoreContainer'
import React, { Fragment } from 'react'
import { ContentContainer } from './ContentContainer/ContentContainer'
import { Grid } from '@material-ui/core'

export const MainContainer = props => (
  <Fragment>
    <StoreContainer auth={props.auth}/>
    <Grid item container lg={12}>
      <Grid item lg={12} sm={12}>
        <Header auth={props.auth} />
      </Grid>
      <Grid item lg={2} md={3} sm={5}>
        <Drawer />
      </Grid>
      <Grid item lg={9} md={8} sm={7}>
        <ContentContainer auth={props.auth}/>
      </Grid>
    </Grid>
  </Fragment>
)
