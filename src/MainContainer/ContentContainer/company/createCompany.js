import React, { useState } from 'react'
import { CREATE_COMPANY } from '../../../utils/query'
import { useMutation } from 'react-apollo-hooks'

const CreateCompany = () => {
  let [name, setName] = useState('')
  let [mother_id, setMother_id] = useState('')

  const createCompanyMutation = useMutation(CREATE_COMPANY)
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          createCompanyMutation({
            variables: {
              name,
              mother_id,
              user_id: localStorage.getItem("sub")
            },
          })
        }}
      >
        {console.log('AccountMutate', createCompanyMutation)}
        <div>
          <label>Name</label>
          <input onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>mother_id</label>
          <input onChange={e => setMother_id(e.target.value)}/>
        </div>
        <button type="submit">Add Company</button>
      </form>
    </div>
  )
}
export default CreateCompany
