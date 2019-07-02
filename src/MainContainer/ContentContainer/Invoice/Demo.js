import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import Context from '../../../Context/Context'
import { uploadFile } from 'react-s3'
import Language from '../../../utils/language'
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
  const [state] = useContext(Context)
  const { classes } = props
  let total = 0
  let totalMvg = 0

  // <AllowedOrigin>127.0.0.1:3000</AllowedOrigin>
  // <AllowedOrigin>http://localhost:3000</AllowedOrigin>
  // <AllowedOrigin>https://localhost:3000</AllowedOrigin>
  // <AllowedMethod>HEAD</AllowedMethod>
  // <AllowedMethod>GET</AllowedMethod>
  // <AllowedMethod>PUT</AllowedMethod>
  // <AllowedMethod>POST</AllowedMethod>
  // <AllowedMethod>DELETE</AllowedMethod>
  // <ExposeHeader>ETag</ExposeHeader>
  // <AllowedHeader>*</AllowedHeader>

  const config = {
    bucketName: 'cfoproject-file-endpoint',
    dirName: 'invoice',
    region: 'eu-west-2',
    accessKeyId: process.env.REACT_APP_Access_Key_ID,
    secretAccessKey: process.env.REACT_APP_Secret_Access_Key,
  }

  const upload = e => {
    console.log('file is : ', e.target.files[0])
    console.log('file type is : ', e.target.files[0].type)
    uploadFile(e.target.files[0], config)
      .then(data => {
        console.log('data: ', data)
      })
      .catch(err => {
        console.log('Err: ', err)
      })
  }

  const printPDFHandeler = () => {
    console.log('CLICK!!')
    const input = document.getElementById('kladda')

    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        pdf.addImage(imgData, 0, 0)
        pdf.save('./tempTestqupload133122.pdf')
      })
      .then(() => {
        fetch('./yen.pdf')
          .then(file => {
            return file.blob()
          })
          .then(file => {
            console.log('file type is : ', file)
            uploadFile(file, config)
              .then(data => {
                console.log('data: ', data)
              })
              .catch(err => {
                console.log('Err: ', err)
              })
          })
      })
  }

  return (
    <Fragment>
      <div
        id="kladda"
        // style={{
        //   width: '210mm',
        //   minHeight: '297mm',
        //   marginLeft: 'auto',
        //   marginRight: 'auto',
        // }}
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
          <Grid item lg={9}>
            <img
              width={100}
              height="auto"
              src="https://tokni.fo/tokni-logo.png"
              alt="myndin riggar ikki.."
            />
          </Grid>
          <Grid item lg={3}>
            <Typography variant="caption">
              {Language[state.locals].invoicenumber}
            </Typography>
            <Typography variant="body1">{props.invoiceNumber}</Typography>
            <br />
            <Typography variant="caption">
              {Language[state.locals].invoicecreated}
            </Typography>
            <Typography variant="body1">{props.created}</Typography>
            <br />
            <Typography variant="caption">
              {Language[state.locals].invoicedue}
            </Typography>
            <Typography variant="body1">{props.dueDate}</Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography variant="subtitle1">Rokning frá: </Typography>
            <Divider />
            <Typography variant="body1">{state.company.name}</Typography>
            <Typography variant="body1">tlf: 35XXXX</Typography>
            <Typography variant="body1">fax: 35XXX1</Typography>
            <Typography variant="body1">adr: Yemen road, Yemen</Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography variant="subtitle1">Rokning til: </Typography>
            <Divider />
            <Typography variant="body1">{props.name}</Typography>
            <Typography variant="body1">tlf: 31XXXX</Typography>
            <Typography variant="body1" />
            <Typography variant="body1">
              adr: Skopunarvegur 15, Skopun
            </Typography>
          </Grid>

          <div style={{ paddingLeft: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{Language[state.locals].product}</TableCell>
                  <TableCell>{Language[state.locals].price}</TableCell>
                  <TableCell>{Language[state.locals].quantity}</TableCell>
                  <TableCell>{Language[state.locals].total}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.products
                  ? props.products.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.product.name}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            {item.price * item.quantity}
                            {item.mvg
                              ? '(' +
                                (item.price * item.quantity + item.mvg) +
                                ' v/ mvg)'
                              : null}
                          </TableCell>
                          <TableCell style={{ display: 'none' }}>
                            {(total += item.price * item.quantity)}
                            {(totalMvg += item.mvg || 0)}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  : null}
                <TableRow>
                  <TableCell rowSpan={2} colSpan={2} />
                  <TableCell>
                    {Language[state.locals].mvg || 'mvg in total:'}:{' '}
                  </TableCell>
                  <TableCell> {totalMvg} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{Language[state.locals].sum}: </TableCell>
                  <TableCell> {total} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Grid item lg={12}>
            <Divider />
            <Typography variant="caption">
              {Language[state.locals].description}
            </Typography>
            <Typography variant="body1">{props.description}</Typography>
          </Grid>
          <Grid item lg={12}>
            <Divider />
            <Typography variant="caption">
              {props.account && props.account.account_numbers
                ? props.account.account_numbers.map((item, index) => {
                    return (
                      item.name +
                      ': ' +
                      item.account_number +
                      (index + 1 === props.account.account_numbers.length
                        ? ''
                        : ' | ')
                    )
                  })
                : null}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <input type="file" onChange={upload} />
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
