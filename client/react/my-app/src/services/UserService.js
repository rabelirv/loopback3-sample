class UserService {
  handleError = (error) => {
    console.log('failure: ' + JSON.stringify(error));
    return Promise.reject(new Error({
      status: error.statusCode,
      message: error.message,
    }));
  };

  signup = async (firstName, lastName, email, password) => {
    const url = 'http://localhost:3000/api/users';
    const requestData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      let responseData = await response.json();
      if (responseData.error) {
        return this.handleError(responseData);
      }

      console.log('success');
      return Promise.resolve(responseData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  login = async (email, password)=> {
    const loginUrl = 'http://localhost:3000/api/users/login';
    const loginData = {
      email,
      password,
    };

    try {
      let response = await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      let responseData = await response.json();
      if (responseData.error) {
        return this.handleError(responseData);
      }
      console.log('success');
      return Promise.resolve(responseData);
    } catch (error) {
      return this.handleError(error);
    }

  }

  // logout = async (user)=> {
  //   const logoutUrl = 'http://localhost:3000/api/users/logout';
  //   try {
  //     let response = await fetch(logoutUrl, {
  //       method: 'POST',
  //       headers:{
  //         'Content-Type': 'application/json',
  //         Authorization: user.id
  //       }
  //     });

    //   let responseData = await response.json();
    //   if (responseData.error) {
    //     return this.handleError(responseData);
    //   }
    //   console.log('success');
    //   return Promise.resolve(responseData);
    // } catch (error) {
    //   return this.handleError(error);
    // }

  // }
};

export default UserService;
