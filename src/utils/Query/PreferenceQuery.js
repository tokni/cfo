import gql from 'graphql-tag'



const SET_LOCALS = gql`
  mutation setLocals($user_id: uuid!, $locals: String!) {
    update_Preferences(
      where: { user_id: { _eq: $user_id } }
      _set: { locals: $locals }
    ) {
      affected_rows
    }
  }
`




export { SET_LOCALS }