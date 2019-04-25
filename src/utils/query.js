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
