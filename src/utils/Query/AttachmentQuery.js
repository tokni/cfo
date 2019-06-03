import gql from 'graphql-tag'

const POST_ATTACHMENT = gql`
  mutation postAttachment($company_id: uuid!, $name: String!, $path: String!) {
    insert_Attachment(
      objects: { company_id: $company_id, name: $name, path: $path }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`

export { POST_ATTACHMENT }
