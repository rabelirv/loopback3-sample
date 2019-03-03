import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import logo from '../logo.svg';
import UserService from '../services/UserService';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  logOutClick = (logoutInfo)=>{
    console.log(logoutInfo)
    fetch("http://localhost:3000/api/users/logout",{
      method: "POST",
      headers:{
      'Content-Type': 'application/json',
      'Authorization': `${logoutInfo.id}`
    }
    })
    .then(res => console.log(res))
    this.props.resetAuth()
  }
  render() {
    const bgInfo = {backgroundColor: '#33b5e5'};
    const logoHeightWidth = { height: '40px', width: '40px'}
    return(


      <Navbar style={bgInfo} dark expand="md" scrolling fixed="top">
        <NavbarBrand href="/">
          <img src={logo} style={logoHeightWidth} alt="logo" />
          <strong>My-App</strong>
        </NavbarBrand>
        <NavbarToggler onClick={ this.onClick } />
        <Collapse isOpen = { this.state.collapse } navbar>

            {this.props.signedin ? (
              <NavbarNav right>
              <NavItem active>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Sign-up</NavLink>
          </NavItem>
          </NavbarNav>
        ):(<NavbarNav right>
          <NavItem >
            <NavLink onClick ={()=>this.logOutClick(this.props.logoutInfo)} to="/logout">Logout</NavLink>
          </NavItem>
          </NavbarNav>

        )}

        </Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
