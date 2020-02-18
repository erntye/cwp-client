import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
// import { Button, Container, Col, Row } from "react-bootstrap";

class Page2 extends Component {

  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <header className="App-header">
          <div>Empty</div>
          <div >
            <Link to="/page1">Extras</Link>
            <Link to="/">Home</Link>
          </div>
        </header>
      </div>
    );
  }

};

export default Page2;