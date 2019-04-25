import React from "react";
import gql from "graphql-tag";
import { client } from "./apollo";
import { useQuery, useSubscription } from "react-apollo-hooks";

client.query({
  query: gql`
    query {
      profile {
        id
        name
      }
    }
  `
});

const GET_PROFILES = client.query({
  query: gql`
    query {
      profile {
        id
        name
      }
    }
  `
});

const GET_SHIT = client.query({
  query: gql`
    {
      profile {
        name
        id
        onlines {
          id
          profile {
            name
            id
          }
          online_time_min
        }
      }
    }
  `
});

const GET_SHIT_2 = useSubscription(
  client.query({
    query: gql`
      {
        subscription {
          profile {
            name
            id
            onlines {
              id
              profile {
                name
                id
              }
              online_time_min
            }
          }
        }
      }
    `
  })
);

const GET_DOGS = gql`
  {
    subscription {
      profile {
        name
        id
        onlines {
          id
          profile {
            name
            id
          }
          online_time_min
        }
      }
    }
  }
`;

export { GET_SHIT, GET_PROFILES, GET_SHIT_2, GET_DOGS };
