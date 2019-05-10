import React, { Fragment } from 'react'

import { Grid, Paper, Typography, Divider } from '@material-ui/core'

const Demo = props => {
  return (
    <Fragment>
      <Grid style={{ paddingTop: 20 }} container lg={12} spacing={40}>
        <Grid item lg={8}>
          <img
            width={100}
            height="auto"
            src="https://tokni.fo/tokni-logo.png"
            alt="myndin riggar ikki.."
          />
        </Grid>
        <Grid item lg={4}>
          <Typography variant="caption">Due date</Typography>
          <Typography variant="body1">{props.dueDate}</Typography>
        </Grid>
        <Grid item lg={8}>
          <Typography variant="subtitle1">Rokning til: </Typography>
          <Typography variant="body1">{props.name}</Typography>
        </Grid>
        <Grid lg={12}>
          <Divider />
        </Grid>
        <Grid item lg={6}>
          <Typography variant="body1">Product: {props.product}</Typography>
        </Grid>
        <Grid item lg={6}>
          <Typography variant="body1">Quantity: {props.quantity}</Typography>
        </Grid>
        <Grid item lg={12}>
          <Divider />
          <Typography variant="caption">Description</Typography>
          <Typography variant="body1">{props.description}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Demo
