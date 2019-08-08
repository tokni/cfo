import Attachment from '../../../Helpers/Attachment'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import StoreExpense from '../../StoreContainer/StoreExpense'
import StoreVendor from '../../StoreContainer/StoreVendor'
import StoreTax from '../../StoreContainer/StoreTax'
import { Add } from '../../../Helpers/Constants'
import { CREATE_BILL } from '../../../utils/Query/BillQuery'
import { POST_MVG } from '../../../utils/Query/MVG'

import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import { withStyles, TextField, MenuItem } from '@material-ui/core'
import { POST_ATTACHMENT } from '../../../utils/Query/AttachmentQuery'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateBill = props => {
  //load expense, vendor, tax
  const expenses = StoreExpense()
  const vendors = StoreVendor()
  const taxes = StoreTax()

  const [open, setOpen] = useState(false)
  const [vendor_id, setVendor_id] = useState('')
  const [expense_id, setExpense_id] = useState('')
  const [description, setDescription] = useState('')
  const [tax_id, setTax_id] = useState('')
  const [payment, setPayment] = useState(0)
  const [date_bill_received, setDate_bill_received] = useState(null)
  const [payment_due, setPayment_due] = useState(null)
  const [file, setFile] = useState(null)

  const createBilltMutation = useMutation(CREATE_BILL)
  const createMvgMutation = useMutation(POST_MVG)
  const postAttachment = useMutation(POST_ATTACHMENT)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setVendor_id('')
    setExpense_id('')
    setDescription('')
    setTax_id('')
    setPayment(0)
    setDate_bill_received(null)
    setPayment_due(null)
    setFile(null)
    if (state.company) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = async e => {
    if (
      state.vendor_id !== '' &&
      state.expense_id !== '' &&
      description !== '' &&
      tax_id !== '' &&
      payment !== 0 &&
      date_bill_received !== null &&
      payment_due !== null
    ) {
      if (
        process.env.NODE_ENV !== 'test' &&
        process.env.NODE_ENV !== 'development'
      ) {
        // && process.env.NODE_ENV !== 'development
        // console.log('env is: ', process.env.NODE_ENV)
        Object.defineProperty(file, 'name', {
          writable: true,
          value: Date.now() + '_' + file.name,
        })
        const s3 = new Attachment({ type: 'bill' }).upload(file)
        const name = file.name
        let attachmentId
        let billId
        s3.then(async path => {
          attachmentId = await postAttachment({
            variables: {
              company_id: state.company.id,
              name: name,
              path: path,
            },
          })
        })
        .then(async () => {
            billId = await createBilltMutation({
              variables: {
                vendor_id,
                expense_id,
                description,
                tax_id: tax_id.id,
                payment,
                date_bill_received,
                payment_due,
                attachment_id:
                  attachmentId.data.insert_Attachment.returning[0].id,
                company_id: state.company.id,
              },
            })
          })
          .then(() => {
            createMvgMutation({
              variables: {
                outgoing: false,
                rate: tax_id.tax_percentage,
                amount: payment * 0.2,
                fk_id: billId.data.insert_Bill.returning[0].id,
                accounting_year_id: state.accounting_year.id,
              },
            })
          })
      } else if (
        process.env.NODE_ENV === 'test' ||
        process.env.NODE_ENV === 'development'
      ) {
        let dev_billId
        dev_billId = await createBilltMutation({
          variables: {
            vendor_id,
            expense_id,
            description,
            tax_id: tax_id.id,
            payment,
            date_bill_received,
            payment_due,
            attachment_id: 'c28dfb73-64c2-4d65-a8cf-f5698f4a3399',
            company_id: state.company.id,
          },
        })
        await createMvgMutation({
          variables: {
            outgoing: false,
            rate: tax_id.tax_percentage,
            amount: payment * tax_id.tax_percentage,
            fk_id: dev_billId.data.insert_Bill.returning[0].id,
            accounting_year_id: state.accounting_year.id,
          },
        })
      }

      setTimeout(() => {
        setMsgSuccess(true)
        setMsg(true)
      }, 1000)
    } else {
      setTimeout(() => {
        setMsgSuccess(false)
        setMsg(true)
      }, 1000)
    }
    handleClose()
  }

  return (
    <Fragment>
      <Modal
        Icon={Add}
        title="addbill"
        text="fillformtoaddbill"
        name="addbill"
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          select
          margin="dense"
          variant="outlined"
          value={vendor_id || ''}
          id="vendor"
          label={Language[state.locals].vendor}
          fullWidth
          onChange={e => {
            setVendor_id(e.target.value)
          }}
        >
          {vendors
            ? vendors.map((item, index) => {
                return index <= vendors.length ? (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ) : null
              })
            : null}
        </TextField>
        <TextField
          select
          margin="dense"
          value={expense_id || ''}
          id="expense"
          variant="outlined"
          label={Language[state.locals].expense}
          fullWidth
          onChange={e => {
            setExpense_id(e.target.value)
          }}
        >
          {expenses ? (
            expenses.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              )
            })
          ) : (
            <MenuItem disabled value="">
              empty
            </MenuItem>
          )}
        </TextField>

        <TextField
          margin="dense"
          id="description"
          variant="outlined"
          label={Language[state.locals].description}
          value={description || ''}
          type="text"
          fullWidth
          onChange={e => {
            setDescription(e.target.value)
          }}
        />

        <TextField
          margin="dense"
          id="payment"
          variant="outlined"
          label={Language[state.locals].payment}
          value={payment || ''}
          type="number"
          fullWidth
          onChange={e => {
            setPayment(e.target.value)
          }}
        />
        <TextField
          select
          margin="dense"
          id="tax"
          variant="outlined"
          label={Language[state.locals].tax}
          value={tax_id || ''}
          fullWidth
          onChange={e => {
            setTax_id(e.target.value)
          }}
        >
          {taxes ? (
            taxes.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item.name + ' %' + item.tax_percentage * 100}
                </MenuItem>
              )
            })
          ) : (
            <MenuItem disabled value={''}>
              No tax created
            </MenuItem>
          )}
        </TextField>

        <TextField
          margin="dense"
          id="tax"
          variant="outlined"
          label={Language[state.locals].date_bill_received}
          value={date_bill_received || Date.now()}
          type="date"
          fullWidth
          onChange={e => {
            setDate_bill_received(e.target.value)
          }}
        />
        <TextField
          margin="dense"
          id="payment_due"
          variant="outlined"
          label={Language[state.locals].payment_due}
          value={payment_due || Date.now()}
          type="date"
          fullWidth
          onChange={e => {
            setPayment_due(e.target.value)
          }}
        />
        <input
          type="file"
          onChange={e => {
            setFile(e.target.files[0])
          }}
        />
      </Modal>

      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Bill updated successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Fill all parameters'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateBill.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateBill)
