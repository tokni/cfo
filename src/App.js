import React from "react";
import logo from "./logo.svg";
import { GET_PROFILES, GET_SHIT_2, GET_SHIT, GET_DOGS } from "./utils/query";
import { useQuery, useSubscription } from "react-apollo-hooks";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlines: []
    };
  }

  componentDidMount() {
    //this.getUserData();
  }

  getUserData = () => {
    // const profiles = GET_PROFILES;
    // const test1 = GET_SHIT;
    // console.log("profiles: ", profiles.data);
    // test1.then(res => {
    //   console.log("res", res.data.profile[0].onlines);
    //   this.setState({
    //     onlines: res.data.profile[0].onlines
    //   });
    // });
  };

  showData = () => {
    const data = this.state.onlines;

    return data.map(item => {
      return <h2>{item.online_time_min}</h2>;
    });
  };
  Dogs = () => {
    const { data, error, loading } = useQuery(GET_PROFILES);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <ul>
        {data.dogs.map(dog => (
          <li key={dog.id}>{dog.breed}</li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          <p>some data ....</p>
          {this.Dogs()}
          {this.showData()}
        </div>
      </div>
    );
  }
}

export default App;
