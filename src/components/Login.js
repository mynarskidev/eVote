import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import history from '../helpers/History';


class Login extends Component {
    state = {
        username:'',
        password:'',
        error:''
    }

    componentDidMount() {
        if(localStorage.getItem('auth')){
            history.push('/home');
        }
    }

    handleRegisterClick() {
        history.push('/register');
    }

    handleEnter = (e) =>{
        let other=this;
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13) { //Enter keycode
            other.handleClick(e)
        }
    }

    handleClick(event){
        this.setState({error: ""})
        const { username, password} = this.state;
        if (!username || !isNaN(username)) {
          this.setState({ error: 'Username is not valid' });
        } else if (!password || !isNaN(password)) {
          this.setState({ error: 'Password is not valid' });
        } else {
          this.setState({error: ''})
        //   this.handleApiPost(event)//todo
            history.push('/home');
        }
    }

    handleApiPost(event) {
        let apiBaseUrl = "http://localhost:8081/api";
        let payload = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(apiBaseUrl + '/session', payload)
            .then(function (response) {
                if (response.status === 200) {
                        if (response.data.token) {
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('auth', response.data.authenticated);
                            localStorage.setItem('username', response.data.username);
                        }
                        history.push('/home');
                    }
                    else if (response.status === 204) {
                        alert("Wrong credentials or not registered yet")
                    }
                    else if (response.status === 500) {
                        alert("Wrong credentials or not registered yet")
                    } else {
                        alert("Wrong credentials or not registered yet");
                    }
                })
            .catch(function (error) {
                alert("Wrong credentials or not registered yet")
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
                            title="e-Vote App - Login"
                        />
                        <img className='welcome-image' src='img/welcome.png' alt="Welcome!" />
                        <br/>
                        {(this.state.error !== '') ? <span style={{color: "red", fontSize:"40px"}}>{this.state.error}</span> : ''}
                        <br />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onKeyPress={this.handleEnter}
                            onChange={(event, newValue) =>  this.setState({ password: newValue })}
                        />
                        <br />
                        <Button variant="success" onClick={(event) => this.handleClick(event)}>Submit</Button>
                        <br />
                        <p>Not Registered yet. Go to registration page!</p>
                        <Button variant="secondary" onClick={(event) => this.handleRegisterClick(event)}>Register</Button>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
 margin: 15,
};

export default Login;