import Company from '../Company/GetCompany'
import Context from '../../../Context/Context'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Attachment from '../../../Helpers/Attachment'
import React, { useContext, Fragment } from 'react'
import { POST_ATTACHMENT } from '../../../utils/Query/AttachmentQuery'
import { Typography } from '@material-ui/core'
import { SET_LOCALS } from '../../../utils/Query/PreferenceQuery'
import { useMutation } from 'react-apollo-hooks'

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
      <button name="en" onClick={handleClicker.bind(this, 'en')}>
        EN
      </button>
      <button name="fo" onClick={handleClicker.bind(this, 'fo')}>
        FO
      </button>

      <input type="file" onChange={handleFile} />

      <button name="de" onClick={handleClicker.bind(this, 'de')}>
        DE
      </button>
      <Grid item container spacing={8} lg={12}>
        <Grid
          item
          lg={3}
          md={9}
          sm={12}
          style={{ color: '#001011', padding: 20 }}
        >
          <Grid item container justify="center">
            <Paper style={{ padding: 8, height: 400, overflowX: 'auto' }}>
              <Typography gutterBottom variant="title">
                Standard license
              </Typography>
              <Typography gutterBottom variant="body1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
              <Typography gutterBottom variant="title">
                Why do we use it?
              </Typography>
              <Typography variant="body1">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item lg={8} md={11} sm={11}>
          <Company />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Home
