import React, { Fragment } from 'react'

import { Grid, Paper, Typography } from '@material-ui/core'

const Invoice = () => {
  return (
    <Fragment>
      <Grid container lg={12}>
        <Grid lg={7}>
          <Paper style={{ padding: 40 }}>
            <Typography variant="display3">Form !!!!!!!!!!</Typography>
          </Paper>
        </Grid>
        <br />
        <Grid lg={4}>
          <Paper style={{ padding: 40 }}>
            <Typography variant="display3">DEMO !!!!!!!</Typography>
            <Typography variant="display1">End product</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Invoice
