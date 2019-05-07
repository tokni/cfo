import React, { Fragment } from 'react'
import Header from '../MainContainer/HeaderContainer/Header'
import { ContentContainer } from './ContentContainer/ContentContainer'
import StoreContainer from './StoreContainer/StoreContainer'

export const MainContainer = () => (
  <Fragment>
    <StoreContainer/>
    <Header />
    <ContentContainer />
  </Fragment>
)
