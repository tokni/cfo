import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import { client } from "./utils/apollo";
import Company from "./components/company/getCompany";
import DayBook from "./components/Day Book/getDayBook"

import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>C.FO</h1>
        </header>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">user id</th>
            <th scope="col">company name</th>
          </tr>
        </thead>
        <tbody>
          <Company />
        </tbody>
      </table>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">balance</th>
          </tr>
        </thead>
        <tbody>
          <DayBook/>
        </tbody>
      </table>

      
    </ApolloProvider>
  );
}

export default App;
