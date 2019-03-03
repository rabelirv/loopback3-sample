import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import UserService from '../services/UserService';


class LoginModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      form: {
        email: 'jaslam.test@gmail.com',
        password: 'Password123',
      },
    };
  };

  componentDidMount() {
    this.toggle();
  }

  // componentWillUnmount() {
  //   this.setState({ modal: false });
  // }


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  onEmailChange = (event) => {
    this.setState({ form: { ...this.state.form, email: event.target.value } });
  }

  onPasswordChange = (event) => {
    this.setState({ form: { ...this.state.form, password: event.target.value } });
  }

  onLoginClick = (userObj) => {
    let response = (new UserService()).login(
      this.state.form.email,
      this.state.form.password,
    );

    response.then((user) => {
      console.log('user: ' + JSON.stringify(user));
      this.toggle();
      this.props.getUserData(user)
      this.props.getUserLogout(user)
    }).catch((error) => {
      console.log('error: ' + JSON.stringify(error));
    });
    this.props.checkAuth()
  };


  render() {
    return (
      <Container>
        {/*<Button onClick={this.toggle}>Sign-up</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            <strong>Login</strong>
          </ModalHeader>

          <ModalBody>
            <form>
              <label htmlFor="Email" className="grey-text">Email</label>
              <input type="email" id="Email" className="form-control" value={this.state.form.email} onChange={ this.onEmailChange } />
              <br/>
              <label htmlFor="Password" className="grey-text">Password</label>
              <input type="password" id="Password" className="form-control" value={this.state.form.password} onChange={ this.onPasswordChange } />
              <br/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
            <Button color="primary" onClick={()=>this.onLoginClick(this.state.form)}>Login</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

LoginModalComponent.propTypes = {
  show: PropTypes.bool
};

export default LoginModalComponent
