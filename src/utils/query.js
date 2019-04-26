import gql from "graphql-tag";
// import { client } from "./apollo";
const GET_COMPANY = gql`
  {
    Company {
      user_id
      name
    }
  }
`;

// const LATER !!! =
//   client.query({
//     query: gql`
//       {
//         subscription {
//           profile {
//             name
//             id
//             onlines {
//               id
//               profile {
//                 name
//                 id
//               }
//               online_time_min
//             }
//           }
//         }
//       }
//     `
//   })

export { GET_COMPANY };


const GET_DAY_BOOK = gql`
{
  day_book{
    account_id
    name
    balance
  }
}
`;
export {GET_DAY_BOOK};