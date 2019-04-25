import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { ApolloClient } from "apollo-boost";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const http = new HttpLink({
  uri: "https://halflife.herokuapp.com/v1alpha1/graphql",
  headers: {
    "x-hasura-role": "user",
    "x-hasura-user-id": 1
  },
  fetch
});

const wsClient = new SubscriptionClient(
  "wss://halflife.herokuapp.com/v1alpha1/graphql",
  {
    reconnect: true,
    headers: {
      "x-hasura-role": "user",
      "x-hasura-user-id": 1
    }
  }
);

const websocket = new WebSocketLink(wsClient);
// const ws = new WebSocketLink({
//   uri: "wss://halflife.herokuapp.com/v1alpha1/graphql",
//   headers: {
//     "x-hasura-role": "user",
//     "x-hasura-user-id": 1
//   },
//   fetch
// });

const link = new split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefination" && operation === "subscription";
  },
  websocket,
  http
);

export const client = new ApolloClient({ link, cache: new InMemoryCache() });
