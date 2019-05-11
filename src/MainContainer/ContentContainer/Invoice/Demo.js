import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Print from '@material-ui/icons/Print'
import {
  Grid,
  Typography,
  Divider,
  Fab,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from '@material-ui/core'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const Demo = props => {
  const { classes } = props
  let total = 0
  const printPDFHandeler = () => {
    console.log('CLICK!!')
    const input = document.getElementById('kladda')
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 0, 0)

      pdf.save('tempTest.pdf')
    })
  }

  return (
    <Fragment>
      <div
        id="kladda"
        style={{
          width: '210mm',
          minHeight: '297mm',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Grid
          style={{
            width: '210mm',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 20,
          }}
          container
          lg={12}
          spacing={40}
        >
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
          <Grid item lg={12}>
            <Divider />
          </Grid>
          <div style={{ paddingLeft: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.products
                  ? props.products.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.product}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price * item.quantity}</TableCell>
                          <div style={{ display: 'none' }}>
                            {(total += item.price * item.quantity)}
                          </div>
                        </TableRow>
                      )
                    })
                  : null}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell colSpan={2}>Sum: </TableCell>
                  <TableCell> {total} </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <Grid item lg={12}>
            <Divider />
            <Typography variant="caption">Description</Typography>
            <Typography variant="body1">{props.description}</Typography>
          </Grid>
        </Grid>
      </div>
      <Fab
        onClick={printPDFHandeler}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <Print />
      </Fab>
    </Fragment>
  )
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Demo)
