import gql from 'graphql-tag'

const GET_USER = gql`
query($token: String!) {
  User(where: { token: { _like: $token } }) {
    first_name
    last_name
    id
  }
}
`

const POST_USER = gql`
mutation postUser(
    $first_name: String!
    $last_name: String!
    $token: String!
  
  ) {
    insert_User(
      objects: {
        token: $token      	
        first_name: $first_name
        last_name: $last_name
      }
    ) {
      affected_rows
    }
  }
`

const GET_USER_PREF = gql`
  query getPref($user_id: uuid!) {
    Preferences(where: { user_id: { _eq: $user_id } }) {
      locals
      current_company
    }
  }
`


export {GET_USER, POST_USER, GET_USER_PREF}