import { useSubscription } from "react-apollo-hooks";
import { GET_SUBSCRIP_ACCOUNTS } from "../../utils/query";
import React from "react";

const Accounts = () => {
  const { data, error, loading } = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    suspend: false
  });

  if (loading) {
    console.log("Loading accounts...");
    return (
      <tr>
        <td>-</td>
      </tr>
    );
  }
  if (error) {
    console.log("Error accounts: ", error);
    return (
      <tr>
        <td>-</td>
      </tr>
    );
  }
  console.log("Accounts data er : ", data.Account);
  return data.Account.map((item, key) => {
    return (
      <tr key={key}>
        <th>{item.id}</th>
        <td>{item.name}</td>
        <td>{item.balance}</td>
        <td>{item.debit ? 'debit' : 'credit'}</td>
        
        
        <td>{item.Company.name}</td>
      </tr>
    );
  });
};

export default Accounts;
