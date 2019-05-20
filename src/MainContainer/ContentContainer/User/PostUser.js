import { useEffect } from 'react'
import { POST_USER } from '../../../utils/Query/UserQuery'
import { useMutation } from 'react-apollo-hooks'

const PostUser = props => {
  const createUserMutation = useMutation(POST_USER, {
    variables: {
      token: localStorage.getItem('sub'),
      first_name: props.first_name,
      last_name: props.last_name,
    },
  })

  useEffect(() => {
    async function PostUser() {
      await createUserMutation()
    }
    PostUser()
  })
  return null
}

export default PostUser