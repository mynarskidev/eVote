import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import history from '../helpers/History';


class Login extends Component {
    state = {
        email:'',
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
        if(code === 13) {
            other.handleClick(e)
        }
    }

    handleClick(event){
        this.setState({error: ""})
        const { email, password} = this.state;
        if (!email || !isNaN(email)) {
          this.setState({ error: 'Email is not valid' });
        } else if (!password || !isNaN(password)) {
          this.setState({ error: 'Password is not valid' });
        } else {
          this.setState({error: ''})
            //this.handleApiPost(event)//TODO cosole.log i usun to co poniżej jak skonczysz handleapipost
            email==='admin@evote.pl' ? localStorage.setItem('role', 'admin') : localStorage.setItem('role', 'user'); //todo console.log
            localStorage.setItem('email', email); //todo console.log
            localStorage.setItem('auth', true); //todo console.log
            history.push('/home'); //todo console.log
            //usun dotad todo console.log 
        }
    }

    handleApiPost(event) {
        let apiBaseUrl = "http://localhost:8080";
        const { email, password} = this.state;
        let payload = {
            email: email,
            password: password
        }
        axios.post(apiBaseUrl + '/login', payload)
            .then(function (response) {
                if (response.status === 200) {
                        if (response.data.token) {
                            localStorage.setItem('token', response.data.token);
                            //localStorage.setItem('auth', response.data.authenticated); //Todo console.log czy jest to w odpowiedzi?/jesli nie to jesli jest token to setuj auth jako true
                            response.data.token ? localStorage.setItem('auth', true) : localStorage.setItem('auth', false); //todo console.log to albo to powyzej
                            localStorage.setItem('email', (response.data.email || email)); //Todo console.log czy jest to w odpowiedzi?
                            email==='admin@evote.pl' ? localStorage.setItem('role', 'admin') : localStorage.setItem('role', 'user');
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
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
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

export default Login;