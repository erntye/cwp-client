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
      .get(https_add + '/api/website')
      .then(res => { this.setState({ websites: res.data }) })
      .catch(alert);
  }

  render() {
    const { websites } = this.state;
    return (
      <div className="App">
        <NavBar></NavBar>
        <header className="App-header">
          <Container >
            <Row >
              <Col xs={{ span: 4, offset: 4 }}>
                <WebsiteList websites={websites}></WebsiteList>
              </Col>
            </Row>
            <Row>
              <Col> <Button className="float-right" onClick={this.initializeWebsites}>Initialize</Button>      </Col>
              <Col> <Button className="float-left" onClick={this.deleteAllWebsites}>Delete All</Button>      </Col>
            </Row>
            <br />
            <Row>
              <Col> <Button className="float-right" variant="outline-primary " onClick={this.callHTTP}>HTTP Call</Button>      </Col>
              <Col> <Button className="float-left" onClick={this.callHTTPS}>HTTPS Call</Button>      </Col>
              <Col> <Button className="float-left" onClick={this.callAPIM}>APIM Call</Button>      </Col>

            </Row>
            <br />
            <Row>
              <Col> <Button className="float-right" variant="outline-primary " onClick={this.callLBHTTP}>LB HTTP Call</Button>      </Col>
              <Col> <Button onClick={this.callLBHTTPS}>LB HTTPS Call</Button>      </Col>
              <Col> <Button onClick={this.callLBHTTPS2}>LB HTTPS Call 2</Button>      </Col>
              <Col> <Button onClick={this.callLBHTTPS3}>LB HTTPS Call 3</Button>      </Col>


            </Row>
            <div >
              <Link to="/page2">Page 2</Link>
              <Link to="/">Home</Link>
            </div>
          </Container>
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

  callAPIM = () => {
    console.log("apim")
    axios
      .get('https://cwpilb.azure-api.net/ilb/api/website')
      .then(res => {
        console.log(`${res.data}`)
        axios
          .get(https_add + '/api/website')
          .then(res => this.setState({ websites: res.data }))
          .catch(alert)
      })
      .catch(alert)
  };

  callLBHTTP = () => {
    console.log("lb http")
    fetch('http://10.0.1.200:5001')
      .then(res => res.text())
      .then(res => console.log(`lb http ${res}`))
      .catch(e => console.log(e));
  };

  callLBHTTPS = () => {
    console.log("lb https")
    fetch('https://10.0.1.200:5002')
      .then(res => res.text())
      .then(res => console.log(`lb https ${res}`))
      .catch(e => console.log(e));
  };
  callLBHTTPS2 = () => {
    console.log("lb https 2")
    const https = require('https')
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    fetch('https://10.0.1.200:5002', { agent })
      .then(res => res.text())
      .then(res => console.log(`lb https 2${res}`))
      .catch(e => console.log(e));
  };

  callLBHTTPS3 = () => {
    var request = require('request')
    var https = require('https')
    var agentOptions = { rejectUnauthorized: false }
    var agent = new https.Agent(agentOptions)
    request({
      url: 'https://10.0.1.200:5002',
      method: 'GET',
      agent: agent
    }, (err, resp, body) => {
      console.log(err, resp, body)
    })
  };

  initializeWebsites = () => {
    const doInitialize = window.confirm('Do you want to initialize random data into DB?');
    if (!doInitialize) return;
    axios
      .post(https_add + '/api/website/initialize')
      .then(res => {
        console.log(`${res.data}`)
        axios
          .get(https_add + '/api/website')
          .then(res => this.setState({ websites: res.data }))
          .catch(alert)
      })
      .catch(alert)
  };

  deleteAllWebsites = () => {
    const doDelete = window.confirm('Do you want to delete all data from DB?');
    if (!doDelete) return;
    axios
      .delete(https_add + '/api/website/all')
      .then(res => this.setState({ websites: [] }))
      .catch(err => alert(`failed to delete all ${JSON.stringify(err)}`))
  };



};

export default Page1;