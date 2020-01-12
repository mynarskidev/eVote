import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'react-bootstrap/Button';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import history from '../helpers/History';

class Register extends Component {

    state = {
      email:'',
      password:'',
      passwordCheck:'',
      firstname:'',
      surname:'',
      error:''
    }

    handleValidation(event) {
      this.setState({error: ""})
      const { password, passwordCheck, firstname, surname, email} = this.state;
      if (!email || !isNaN(email)|| !this.validateEmail(email)) {
        this.setState({ error: 'Email is not valid' });
      } else if (!password || !isNaN(password)) {
        this.setState({ error: 'Password is not valid' });
      } else if (!passwordCheck || !isNaN(passwordCheck)) {
        this.setState({ error: 'Password is not valid' });
      } else if (password !== passwordCheck) {
        this.setState({ error: 'The re-entered password is not the same' });
      } else if (!firstname || !isNaN(firstname)) {
        this.setState({ error: 'First name is not valid' });
      } else if (!surname || !isNaN(surname)) {
        this.setState({ error: 'Last Name is not valid' });
      } else {
        this.setState({error: ''})
        this.handleSubmit(event)
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

  handleSubmit(event) {
    let apiBaseUrl = "http://localhost:8080";
    let payload = {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        surname: this.state.surname,
    }
    axios.post(apiBaseUrl + '/signon', payload)
      .then(function (response) {
        if (response.status === 201) {
              alert("Registration was successful, You can now log in!")
              history.push('/');//TODO console.log zrob privateRoute w App!!!
        }
        if (response.status === 409) {
          alert("User already exists!!!")
        }
      })
      .catch(function (error) {
        alert("User already exists!")
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
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
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
             onChange = {(event,newValue) => this.setState({passwordCheck:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({firstname:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({surname:newValue})}
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