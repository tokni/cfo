import gql from "graphql-tag";
const GET_COMPANY = gql`
  {
    Company {
      user_id
      name
    }
  }
`;

const GET_SUBSCRIP_COMPANY = gql`
  subscription {
    Company {
      user_id
      name
    }
  }
`;

const GET_DAY_BOOK = gql`
  {
    day_book {
      account_id
      name
      balance
    }
  }
`;

export { GET_COMPANY, GET_DAY_BOOK, GET_SUBSCRIP_COMPANY };
