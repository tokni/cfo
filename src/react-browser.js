import React from "react";
import { checkSession } from "./Auth/Auth";

class SessionCheck extends React.Component {
  state = {
    loading: true
  };

  construct() {
    this.handleCheckSession = this.handleCheckSession.bind(this);
  }

  handleCheckSession = () => {
    this.setState({ loading: false });
  };

  componentWillMount() {
    console.log("inni í browser !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(localStorage.getItem("isLoggedIn"))
    checkSession(this.handleCheckSession);
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    );
  }
}

exports.wrapRootElement = ({ element }) => {
  console.log("inni í root element");
  return <SessionCheck>{element}</SessionCheck>;
};

// export const wrapRootElement = ({ element }) => {
// };
