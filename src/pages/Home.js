import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

class Home extends Component {

  callAPI() {
    console.log("test")
    fetch("http://20.43.176.165:5001/index")
    .then(res => res.text())
    .then(res => console.log(res));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <Button onClick={this.callAPI}>API Call</Button>
          </p>
          <Link to="/page1">Click to go to Page 1</Link>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }
};



export default Home;