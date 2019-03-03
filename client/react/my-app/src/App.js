import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import MainContentComponent from './components/MainContentComponent';
import FooterComponent from './components/FooterComponent';

class App extends Component {
  state = {
    signedin:true,
    logoutInfo:{}
  }

  getUserLogout = (userObj)=>{
    this.setState({
      logoutInfo: userObj
    })
  }

  checkAuth = ()=>{
    this.setState({
      signedin:false
    })
  }

  resetAuth = ()=>{
    this.setState({
      signedin: true
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderComponent logoutInfo={this.state.logoutInfo}signedin ={this.state.signedin} resetAuth={this.resetAuth}/>

          <MainContentComponent getUserLogout={this.getUserLogout}checkAuth={this.checkAuth} signedin={this.state.signedin}/>

          <FooterComponent />
        </div>
      </Router>
    );
  }
}

export default App;
