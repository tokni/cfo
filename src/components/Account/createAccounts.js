import React, { useState } from "react";
import { createAccount, GET_COMPANY } from "../../utils/query";
import { useMutation, useQuery } from "react-apollo-hooks";

const CreateAccounts = () => {
  let [name, setName] = useState("");
  let [debit, setDebit] = useState("");
  let [balance, setBalance] = useState("");

  const createAccountMutation = useMutation(createAccount);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createAccountMutation({
            variables: {
              name,
              balance,
              debit,
              company_id: "fd20c139-c5c9-4922-bb7b-5f0fdeba9f03"
            }
          });
          
        }}
      >
        {console.log("AccountMutate", createAccountMutation)}
        <div>
          <label>Name</label>
          <input onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Debit</label>
          <input onChange={e => setDebit(e.target.value)} />
        </div>
        <div>
          <label>Balance</label>
          <input onChange={e => setBalance(e.target.value)} />
        </div>
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
};
export default CreateAccounts;
