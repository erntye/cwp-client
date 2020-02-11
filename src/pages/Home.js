import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import { Link, Prompt } from "react-router-dom";
import axios from 'axios';
import { ButtonToolbar, ButtonGroup, Container, Col, Row } from "react-bootstrap";

class Home extends Component {

  http_add = "http://20.43.176.165:5001";
  https_add = "https://20.43.176.165:5002";
  constructor(props) {
    super(props);

    this.state = {
      websites: [],
      test: false
    };
  }

  componentDidMount() {
    axios
      .get(this.https_add+'/api/website')
      .then( res => {this.setState({ websites: res.data})})
      .catch(alert);
  }

  render() {
    const {websites} = this.state;
    return (
      <div className="App">

        <header className="App-header">
          <ul>
            {websites.map( websiteModel => (
              <li>{websiteModel.websiteName}</li>
            ))}
          </ul>
          <Container>
            <Row>
              <Col> <Button className="float-right"onClick={this.createWebsite}>Create</Button>      </Col>
              <Col> <Button className="float-left" >Placeholder</Button>      </Col>
            </Row>
            <br />
            <Row>
              <Col> <Button className="float-right"onClick={this.initializeWebsites}>Initialize</Button>      </Col>
              <Col> <Button className="float-left" onClick={this.deleteWebsites}>Delete</Button>      </Col>
            </Row>
            <br />
            <Row>
              <Col> <Button className="float-right" variant ="outline-primary "onClick={this.callHTTP}>HTTP Call</Button>      </Col>
              <Col> <Button className="float-left" onClick={this.callHTTPS}>HTTPS Call</Button>      </Col>
            </Row>
          </Container>
          <Link to="/page1">Click to go to Page 1</Link>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }

  callHTTP = () => {
    console.log("http")
    fetch(this.http_add)
    .then(res => res.text())
    .then(res => console.log(res));
  };

  callHTTPS = () => {
    console.log("https")
    fetch(this.https_add)
    .then(res => res.text())
    .then(res => console.log(res));
  };
  
  initializeWebsites = () => {
    const doInitialize = window.confirm('Do you want to initialize random data into DB?');
    if (!doInitialize) return;
    axios
      .post(this.https_add+'/api/website/initialize')
      .then( () => {
        axios
          .get(this.https_add + '/api/website')
          .then( res => this.setState({ websites: res.data}))
          .catch(alert)
      })
      .catch(alert)
  };

  deleteWebsites = () => {
    const doDelete = window.confirm('Do you want to delete all data from DB?');
    if (!doDelete) return;
    axios
      .delete(this.https_add+'/api/website/')
      .then( res => this.setState({websites: []}))
      .catch(err => alert(`failed to delete all ${JSON.stringify(err)}`))
  };

  createWebsite = () => {
    const websiteName = prompt('Please enter the website name')
    console.log(websiteName)
    axios
      .post(this.https_add+'/api/exec/create', {websiteName:websiteName})
      .then( res => this.setState({websites: []}))
      .catch(err => alert(`${JSON.stringify(err)}`))
  }
};



export default Home;