import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

class Home extends Component {

  callHTTP() {
    console.log("test")
    fetch("http://20.43.176.165:5001/index")
    .then(res => res.text())
    .then(res => console.log(res));
  };

  callHTTPS() {
    console.log("test")
    fetch("https://20.43.176.165:5002/index")
    .then(res => res.text())
    .then(res => console.log(res));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <Button onClick={this.callHTTP}>HTTP Call</Button>
          </p>
          <p>
            <Button onClick={this.callHTTPS}>HTTPS Call</Button>
          </p>
          <Link to="/page1">Click to go to Page 1</Link>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }
};



export default Home;