import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button, Container, Col, Row, Navbar } from "react-bootstrap";
import { https_add } from '../config/const'
import WebsiteList from "../components/WebsiteList";
import NavBar from "../components/NavBar"
import CreateWebsiteModal from "../components/CreateWebsiteModal";
import DeleteWebsiteModal from "../components/DeleteWebsiteModal";
import EditWebsiteModal from "../components/EditWebsiteModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      websites: [],
      toasts: [],
      showModalCreate: false,
      showModalDelete: false,
      showModalEdit: false,
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
              <Col xs={{ span :4, offset:4 }}>
                <WebsiteList websites={websites}></WebsiteList>
              </Col>
            </Row>

            <Row>
              <Col xs={{ span: 2, offset: 3 }} > <Button block onClick={this.handleShowCreate} style={{justifyContent:"center", display: 'flex'}}>Create</Button>      </Col>
              <Col xs={{ span: 2 }}> <Button block onClick={this.handleShowEdit} style={{ justifyContent: "center", display: 'flex' }}> Edit</Button>      </Col>
              <Col xs={{ span: 2 }}> <Button block onClick={this.handleShowDelete} style={{ justifyContent: "center", display: 'flex' }}>Delete</Button>      </Col>
            </Row>
            <br />
          </Container>
          <Link to="/page1">Click to go to Extras</Link>
        </header>
        <CreateWebsiteModal
          show={this.state.showModalCreate}
          handleClose={this.handleCloseCreate}
          handleSubmit={this.handleSubmitCreate}
        >
        </CreateWebsiteModal>
        <DeleteWebsiteModal
          show={this.state.showModalDelete}
          handleClose={this.handleCloseDelete}
          handleSubmit={this.handleSubmitDelete}
        >
        </DeleteWebsiteModal>
        <EditWebsiteModal
          show={this.state.showModalEdit}
          handleClose={this.handleCloseEdit}
          handleSubmit={this.handleSubmitEdit}
        >
        </EditWebsiteModal>
        <ToastContainer autoClose={5000} position="top-right" hideProgressBar={true}/>

        <p className="App-intro"></p>
      </div>
    );
  }

  notify = () => {
    toast("test")
  }

  createWebsite = (websiteName, websiteSize) => {
    axios
      .post(https_add + '/api/website/create', { websiteName: websiteName, websiteSize: websiteSize })
      .then(res => {
        console.log(res)
        this.setState({ websites: res.data })
        toast(`Website named ${websiteName} created successfully!`)
      })
      .catch(err => {
        console.log(err)
        // if (err && err.response.status === 551) {
        //   toast.error(err.response.data)
        // }
        // if (err && err.response.status === 550) {
        //   toast(err.response.data)
        // }
        // if (err && err.response.status === 552) {
        //   toast.error(err.response.data)
        // }
        if (err.response && [550,551,552].indexOf(err.response.status) >= 0) {
          toast.error(err.response.data)
        }
      })
  }

  deleteWebsite = (websiteName) => {
    axios
      .delete(https_add + '/api/website/', { data: { websiteName: websiteName } })
      .then(res => {
        console.log(res.data)
        this.setState({ websites: res.data })
        toast(`Website named ${websiteName} deleted!`)

      })
      .catch(err => {

        if (err.response && err.response.status === 550) {
          // toast(err.response.data)
        }
        if (err.response && err.response.status === 551) {
          toast(err.response.data)
        }
        if (err.response && err.response.status === 552) {
          toast(err.response.data)
        }
      })
  };

  editWebsite = (websiteName) => {
    //TODO create function and endpoint
    // axios
    //   .delete(https_add + '/api/website/', { data: { websiteName: websiteName } })
    //   .then(res => {
    //     console.log(res.data)
    //     this.setState({ websites: res.data })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     if (err && err.response.status === 550) {
    //       // alert(err.response.data)
    //     }
    //     if (err && err.response.status === 551) {
    //       alert(err.response.data)
    //     }
    //     if (err && err.response.status === 552) {
    //       alert(err.response.data)
    //     }
    //   })
  };


  // deleteWebsite = () => {
  //   const websiteName = prompt('Which website do you want to delete?');
  //   console.log(websiteName)
  //   axios
  //     .delete(https_add + '/api/website/', { data: { websiteName: websiteName } })
  //     .then(res => {
  //       console.log(res.data)

  //       axios
  //         .get(https_add + '/api/website')
  //         .then(res => { console.log('get after del'); this.setState({ websites: res.data }) })
  //         .catch(err => console.log(err))

  //       axios
  //         .delete(https_add + '/api/exec/', { data: { websiteName: websiteName } })
  //         .then(res => {
  //           console.log(res.data)
  //         })
  //         .catch(err => console.log(err))
  //     })
  //     .catch(err => {
  //       if (err && err.response.status === 550) {
  //         // alert(err.response.data)
  //       }
  //       if (err && err.response.status === 551) {
  //         alert(err.response.data)
  //       }
  //       if (err && err.response.status === 552) {
  //         alert(err.response.data)
  //       }
  //     })
  // };


  // createWebsite = (websiteName, websiteSize) => {
  //   axios
  //     .post(https_add + '/api/website/create', { websiteName: websiteName })
  //     .then(res => {

  //       axios
  //         .get(https_add + '/api/website')
  //         .then(res => {
  //           console.log('call get after create')
  //           this.setState({ websites: res.data })
  //         })
  //         .catch(console.log)

  //       axios
  //         .post(https_add + '/api/exec/create', { websiteName: websiteName })
  //         .then(res => {
  //           console.log(res.data)
  //         })
  //         .catch(err => console.log(err))
  //     })
  //     .catch(err => {
  //       if (err && err.response.status === 501) {
  //         alert(err.response.data)
  //       }
  //     })
  // }
  handleCloseCreate = () => this.setState({ showModalCreate: false });
  handleShowCreate = () => this.setState({ showModalCreate: true });
  handleSubmitCreate = (websiteName, websiteSize) => {
    console.log(`submitted form ${websiteName} ${websiteSize}`);
    this.createWebsite(websiteName, websiteSize)
  }
  handleCloseDelete = () => this.setState({ showModalDelete: false });
  handleShowDelete = () => this.setState({ showModalDelete: true });
  handleSubmitDelete = (websiteName, websiteSize) => {
    console.log(`submitted form ${websiteName} ${websiteSize}`);
    this.deleteWebsite(websiteName)
  }
  handleCloseEdit = () => this.setState({ showModalEdit: false });
  handleShowEdit = () => this.setState({ showModalEdit: true });
  handleSubmitEdit = (websiteName, websiteSize) => {
    console.log(`submitted form ${websiteName} ${websiteSize}`);
    this.editWebsite(websiteName, websiteSize)
  }
};



export default Home;