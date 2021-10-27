import './App.css';

import { Component } from "react"
import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid"

import Youtubeform from "./components/youTubeForm"

import SignUpForm from "./components/SignupForm"
import SignInForm from './components/SignInForm';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => (<SignInForm />)} />
          <Route path="/register" exact render={() => (<SignUpForm />)} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));