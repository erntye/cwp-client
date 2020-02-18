import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button, Container, Col, Row, Navbar } from "react-bootstrap";
import { https_add } from '../config/const'
import WebsiteList from "../components/WebsiteList";
import NavBar from "../components/NavBar"

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      websites: [],
    };
  }

  componentDidMount() {
    axios
      .get(https_add+'/api/website')
      .then( res => {console.log('mounted');this.setState({ websites: res.data})})
      .catch(alert);
  }

  render() {
    const {websites} = this.state;
    return (
      <div className="App">
        <NavBar></NavBar>
        <header className="App-header">
          <Container>
            <Row >
              <Col xs={{span:4, offset:4}}>
                <WebsiteList websites={websites}></WebsiteList>
              </Col>
            </Row>
        
            <Row>
              <Col> <Button className="float-right"onClick={this.createWebsite}>Create</Button>      </Col>
              <Col> <Button className="float-left" onClick={this.deleteWebsite}>Delete</Button>      </Col>
            </Row>
            <br />

          </Container>
          <Link to="/page1">Click to go to Extras</Link>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }



  createWebsite = () => {
    const websiteName = prompt('Please enter the website name')
    console.log(websiteName)
    axios
    .post(https_add+'/api/website/create',{websiteName:websiteName})
    .then( res => {
      
      axios
      .get(https_add + '/api/website')
      .then( res => {
        console.log('call get after create')
        this.setState({ websites: res.data})
      })
      .catch(console.log)

      axios
      .post(https_add+'/api/exec/create', {websiteName:websiteName})
      .then( res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
    })
    .catch( err => {
        if (err && err.response.status === 501){
          alert(err.response.data)
        }
    })
  }
  
  deleteWebsite = () => {
    const websiteName = prompt('Which website do you want to delete?');
    console.log(websiteName)
    axios
      .delete(https_add+'/api/website/',{data:{websiteName:websiteName}} )
      .then( res => {
        console.log(res.data)

        axios
        .get(https_add + '/api/website')
        .then( res => {console.log('get after del');this.setState({ websites: res.data})})
        .catch( err=>console.log(err))
  
        axios
        .delete(https_add+'/api/exec/', {data:{websiteName:websiteName}})
        .then( res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
      })
      .catch(err => {
        if (err && err.response.status === 550) {
          // alert(err.response.data)
        }
        if (err && err.response.status === 551) {
          alert(err.response.data)
        }
        if (err && err.response.status === 552) {
          alert(err.response.data)
        }
      })
    };
};



export default Home;