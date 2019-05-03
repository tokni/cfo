import React, { useState, useContext } from 'react'
import { CREATE_COMPANY } from '../../../utils/query'
import { useMutation } from 'react-apollo-hooks'
import Context from '../../../Context/Context'

const CreateCompany = () => {
  let [name, setName] = useState('')
  let [mother_id, setMother_id] = useState(null)

  const createCompanyMutation = useMutation(CREATE_COMPANY)
  const [state] = useContext(Context)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          createCompanyMutation({
            variables: {
              name,
              mother_id,
              user_id: state.user.id
            },
          })
        }}
      >
        <div>
          <label>Name</label>
          <input onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>mother_id</label>
          <input onChange={e => {setMother_id(e.target.value)}}/>
        </div>
        <button type="submit">Add Company</button>
      </form>
    </div>
  )
}
export default CreateCompany
