import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home.js";
import Page1 from "./pages/Page1.js";
import Page2 from "./pages/Page2";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
        </Switch>
      </Router>
    );
  }
}

export default App;