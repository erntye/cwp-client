import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row } from "react-bootstrap";
import axios from 'axios';
import { https_add, http_add } from '../config/const'
import WebsiteList from "../components/WebsiteList";
import NavBar from "../components/NavBar";

class Page1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      websites: [],
    };
  }

  componentDidMount() {
    axios
      .get(https_add+'/api/website')
      .then( res => {this.setState({ websites: res.data})})
      .catch(alert);
  }
  
  render() {
    const {websites} = this.state;
    return (
      <div className="App">
        <NavBar></NavBar>
        <header className="App-header">
          <WebsiteList websites={websites}></WebsiteList>
          <Row>
                <Col> <Button className="float-right"onClick={this.initializeWebsites}>Initialize</Button>      </Col>
                <Col> <Button className="float-left" onClick={this.deleteAllWebsites}>Delete All</Button>      </Col>
              </Row>
              <br />
              <Row>
                <Col> <Button className="float-right" variant ="outline-primary "onClick={this.callHTTP}>HTTP Call</Button>      </Col>
                <Col> <Button className="float-left" onClick={this.callHTTPS}>HTTPS Call</Button>      </Col>
          </Row>
          <div >
            <Link to="/page2">Page 2</Link>
            <Link to="/">Home</Link>
          </div>
        </header>
      </div>
    );
  }
  callHTTP = () => {
    console.log("http")
    fetch(http_add)
    .then(res => res.text())
    .then(res => console.log(`http ${res}`));
  };

  callHTTPS = () => {
    console.log("https")
    fetch(https_add)
    .then(res => res.text())
    .then(res => console.log(`https ${res}`));
  };
  
  initializeWebsites = () => {
    const doInitialize = window.confirm('Do you want to initialize random data into DB?');
    if (!doInitialize) return;
    axios
      .post(https_add+'/api/website/initialize')
      .then( res => {
        console.log(`${res.data}`)
        axios
          .get(https_add + '/api/website')
          .then( res => this.setState({ websites: res.data}))
          .catch(alert)
      })
      .catch(alert)
  };

  deleteAllWebsites = () => {
    const doDelete = window.confirm('Do you want to delete all data from DB?');
    if (!doDelete) return;
    axios
      .delete(https_add+'/api/website/all')
      .then( res => this.setState({websites: []}))
      .catch(err => alert(`failed to delete all ${JSON.stringify(err)}`))
  };



};

export default Page1;