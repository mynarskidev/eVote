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

class App extends Component {
    render() {
       return (
           <div className="App">
               <Router history={history}>
                 <div>
                     <Switch>
                        <PrivateRoute exact path='/home' component={HomeScreen} />
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