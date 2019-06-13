// import React from 'react';
// import Link from 'react-router-dom/Link';

// import {Form, Button, Modal} from 'react-bootstrap';



// const Login = () => (
//     <Modal.Dialog>
//     <Modal.Header>
//       <Modal.Title>Log In</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <Form.Group controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>

//       <Form.Group controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//       </Form.Group>
//       <Form.Group controlId="formBasicChecbox">
//         <Form.Check type="checkbox" label="Remember Me" />
//       </Form.Group>
//     </Modal.Body>
//     <Modal.Footer>
//       <Link to="/list">
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//       </Link>
//     </Modal.Footer>
//   </Modal.Dialog>
// );

// export default Login;

import React, { Component } from 'react';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom/';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { getDataWithQuery } from '../../utils/api';
import storage from '../../utils/storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: false,
      loggedIn: false,
      usernameValid: true,
      passwordValid: true,
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  updateUsername({target}) {
    this.setState({username: target.value, loginError: false});
  }

  updatePassword({target}) {
    this.setState({password: target.value, loginError: false});
  }

  checkUser(userData) {
    if (userData && userData.length) {
      storage.store('user', userData[0]);
      this.setState({loggedIn: true});
      console.log(storage.retreive('user'));
    } else {
      this.setState({loginError: true});
    }
  }

  logIn() {
    const usernameValidation = Yup.string().required().isValid(this.state.username);
    const passwordValidation = Yup.string().required().isValid(this.state.password); 
    Promise.all([usernameValidation, passwordValidation])
      .then(([usernameValid, passwordValid]) => {
        this.setState({usernameValid, passwordValid});
        if(usernameValid && passwordValid) {
          getDataWithQuery('users', {...this.state}).then(this.checkUser);
        }
      });
  }

  render() {
    let alert = null;
    if (this.state.loggedIn) {
      return (<Redirect to="/list" />);
    }
    if (this.state.loginError) {
      alert = (<Alert variant="danger">Check password or username!</Alert>);
    }
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateUsername}
              isInvalid={!this.state.usernameValid}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.updatePassword}
              isInvalid={!this.passwordValid}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="button" onClick={this.logIn}>Log In</Button>
        </Modal.Footer>
        {alert}
      </Modal.Dialog>
    );
  }
}

export default Login;