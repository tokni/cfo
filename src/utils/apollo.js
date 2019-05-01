import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { ApolloClient } from "apollo-boost";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import ws from "ws";

const http = new HttpLink({
  uri: "https://cfo-foeroyar.herokuapp.com/v1alpha1/graphql",
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_X_HASURA_ADMIN_KEY,
    "x-hasura-role": process.env.REACT_APP_X_HASURA_ROLE,
    "x-hasura-user-id": localStorage.getItem("sub")
  },
  fetch
});
const wsForNode = typeof window === "undefined" ? ws : null;
const wsClient = new SubscriptionClient(
  "wss://cfo-foeroyar.herokuapp.com/v1alpha1/graphql",
  {
    reconnect: true,

    connectionParams: () => ({
      headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_X_HASURA_ADMIN_KEY,
        "x-hasura-role": process.env.REACT_APP_X_HASURA_ROLE,
        "x-hasura-user-id": localStorage.getItem("sub")
      }
    }),
    wsForNode
  }
);

const websocket = new WebSocketLink(wsClient);

const link = new split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefinition" && operation === "subscription";
  },
  websocket,
  http
);

export const client = new ApolloClient({ link, cache: new InMemoryCache() });
