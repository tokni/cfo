import Company from '../Company/GetCompany'
import Context from '../../../Context/Context'
import Grid from '@material-ui/core/Grid'
import { Paper, Button, ButtonGroup } from '@material-ui/core'
import Attachment from '../../../Helpers/Attachment'
import React, { useContext, Fragment } from 'react'
import { POST_ATTACHMENT } from '../../../utils/Query/AttachmentQuery'
import { Typography } from '@material-ui/core'
import { SET_LOCALS } from '../../../utils/Query/PreferenceQuery'
import { useMutation } from 'react-apollo-hooks'
import Balance from '../Balance/Balance'
const Home = () => {
  const [state, dispatch] = useContext(Context)
  const MutateLocals = useMutation(SET_LOCALS)
  const postAttachment = useMutation(POST_ATTACHMENT)

  const handleClicker = locals => {
    MutateLocals({
      variables: {
        user_id: state.user ? state.user.id : null,
        locals: locals,
      },
    })

    dispatch({
      type: 'set_locals',
      locals: locals,
    })
  }

  const handleFile = e => {
    let file = e.target.files[0]
    Object.defineProperty(file, 'name', {
      writable: true,
      value: Date.now() + '_' + file.name,
    })
    const s3 = new Attachment({ type: 'home' }).upload(file)
    const name = file.name
    s3.then(path => {
      postAttachment({
        variables: {
          company_id: state.company.id,
          name: name,
          path: path,
        },
      })
    })
  }

  return (
    <Fragment>
      <Grid item container spacing={8} lg={12} md={12}>
        <Grid style={{ padding: '3em' }} item lg={12} md={12} sm={12}>
          <Button
            variant="outlined"
            color="primary"
            name="en"
            onClick={handleClicker.bind(this, 'en')}
          >
            EN
          </Button>
          <Button
            variant="outlined"
            color="primary"
            name="fo"
            onClick={handleClicker.bind(this, 'fo')}
          >
            FO
          </Button>

          <Button
            variant="outlined"
            color="primary"
            name="de"
            onClick={handleClicker.bind(this, 'de')}
          >
            DE
          </Button>

          <input type="file" onChange={handleFile} />
        </Grid>
        <Grid item lg={6} md={6} sm={11}>
          <Company />
        </Grid>
        <Grid
          style={{ paddingTop: 8, overflowX: 'auto' }}
          item
          lg={6}
          md={6}
          sm={12}
        >
          <Paper>
            <Balance />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Home
