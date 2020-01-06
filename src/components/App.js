import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login';
import Register from './Register';
import PageNotFound from './PageNotFound';
import HomeScreen from './HomeScreen';
import history from '../helpers/History';
import PrivateRoute from './PrivateRoute';

// import { history, Role } from '@/_helpers'; //TODO
// import { authenticationService } from '@/_services';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }
    render() {
       return (
           <div className="App">
               <Router history={history}>
                 <div>
                    {/* {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    } */}
                     <Switch>
                        {/* <PrivateRoute exact path='/home' component={HomeScreen} /> TODO*/}
                        <Route exact path='/home' component={HomeScreen} />
                        <Route exact path='/' component={Login} />
                        <Route path="/register" component={Register} />
                        <Route component={PageNotFound} />
                     </Switch>
                 </div>
               </Router>
           </div>
        );
     }
}
export default App;