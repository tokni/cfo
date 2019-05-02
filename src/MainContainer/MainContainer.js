import React, { Fragment } from 'react'
import Header from '../MainContainer/HeaderContainer/Header'
import { ContentContainer } from './ContentContainer/ContentContainer'

export const MainContainer = () => (
  <Fragment>
    <Header />
    <ContentContainer />
  </Fragment>
)
