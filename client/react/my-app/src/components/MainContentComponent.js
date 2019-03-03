import React from "react";
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import SignUpModalComponent from './SignUpModalComponent';
import LoginModalComponent from './LoginModalComponent';

class MainContentComponent extends React.Component {
  state = {
    userData: {id:""},
    user:{},
    msg:""
  }

  getUserTime =()=>{
    let currentTime = new Date()
    let hrs = currentTime.getHours();
    if (hrs >  6) this.setState({msg:"Good morning"})
    if (hrs > 12) this.setState({msg:"Good Afternoon"})
    if (hrs > 17)this.setState({msg:"Good Evening"})
  }

componentDidMount(){
  if (!this.props.signedin) this.setState({user: {}})

}


  getUserData = (userObj)=>{
    console.log(userObj);
    this.setState({
      userData: userObj
    })
    fetch(`http://localhost:3000/api/users/${this.state.userData.userId}`,{
      method: "GET",
      headers:{'Content-Type': 'application/json',
      Authorization: this.state.userData.id},
    })
    .then(res=> res.json())
    .then(user=> this.setState({
      user: user
    }))
    this.getUserTime()
  }

  render() {
    const marginTop64 = {marginTop: '64px'};

    return (
      <div style={marginTop64}>
        <h2 className="display-4">
        {`${this.state.msg} ${this.state.user.firstName} ${this.state.user.lastName}`}
        </h2>

        {/* <SignUpModalComponent show={true}/> */}

        <Switch>
          <Route path="/signup" component={()=><SignUpModalComponent checkAuth = {this.props.checkAuth} getUserData = {this.getUserData} getUserLogout={this.props.getUserLogout}/>} />
          {<Route path="/login" component={()=><LoginModalComponent getUserLogout={this.props.getUserLogout}getUserData={this.getUserData} checkAuth={this.props.checkAuth}/>} />}
        </Switch>
      </div>
    );
  }
}

export default MainContentComponent;
