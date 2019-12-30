import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'react-bootstrap/Button';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import history from '../helpers/History';

class Register extends Component {

    state = {
      username:'',
      password:'',
      passwordTwo:'',
      name:'',
      surname:'',
      email:'',
      error:''
    }

    handleValidation(event) {
      this.setState({error: ""})
      const { username, password, passwordTwo, name, surname, email} = this.state;
      if (!username || !isNaN(username)) {
        this.setState({ error: 'Username is not valid' });
      } else if (!password || !isNaN(password)) {
        this.setState({ error: 'Password is not valid' });
      } else if (!passwordTwo || !isNaN(passwordTwo)) {
        this.setState({ error: 'Password is not valid' });
      } else if (password !== passwordTwo) {
        this.setState({ error: 'The re-entered password is not the same' });
      } else if (!name || !isNaN(name)) {
        this.setState({ error: 'First name is not valid' });
      } else if (!surname || !isNaN(surname)) {
        this.setState({ error: 'Last Name is not valid' });
      } else if (!email || !isNaN(email)|| !this.validateEmail(email)) {
        this.setState({ error: 'Email is not valid' });
      } else {
        this.setState({error: ''})
        this.handleClick(event)
      }
  }

  validateEmail(email) {
    // eslint-disable-next-line
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === false){
        return false;
      }
      return true;
  }

  handleLoginClick(event) {
    history.push('/');
  }

  handleClick(event) {
    let apiBaseUrl = "http://localhost:8081/api";
    let payload = {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
    }
    axios.post(apiBaseUrl + '/users/register', payload)
      .then(function (response) {
        if (response.status === 201) {
              alert("Registration was successful, You can now log in!")
              history.push('/');
        }
        if (response.status === 409) {
          alert("User already exists!!!")
        }
      })
      .catch(function (error) {
        alert("User already exists!!!")
      });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             style={{background: "green"}}
             showMenuIconButton={false}
             title="e-Vote App - Register"
           />
          <br/>
          {(this.state.error !== '') ? <span style={{color: "red", fontSize:"40px"}}>{this.state.error}</span> : ''}
           <br />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password Again"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({passwordTwo:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({surname:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <Button variant="success" onClick={(event) => this.handleValidation(event)}>Submit</Button>
           <br />
            <p>Already registered? Go to login page!</p>
            <Button variant="secondary" onClick={(event) => this.handleLoginClick(event)}>Login</Button>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default Register;