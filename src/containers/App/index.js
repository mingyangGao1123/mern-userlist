import UserList from '../UserList';
import AddUser from '../AddUser';
import EditUser from '../EditUser';

import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>

              <Route exact={true} path="/" component={UserList} />
              <Route path="/adduser" component={AddUser} />
              <Route path="/edituser" component={EditUser} />

            </div>
            </BrowserRouter>
        )
    }
}


export default App;