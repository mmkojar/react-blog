import React, { Fragment, Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import NavbarMenu from './components/Layouts/NavbarMenu';
import Home from './components/Pages/Home';
import Posts from './components/Posts/Posts';
import Category from './components/Posts/Category';
import SinglePost from './components/Posts/SinglePost';
import Addposts from './components/Posts/Addposts';
import Editposts from './components/Posts/Editposts';
import Dashboard from './components/auth/Dashboard';
import Alerts from './components/Layouts/Alerts';
import Profile from './components/auth/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Contact from './components/Pages/Contact'
import Protected from './components/Protected';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

const alertOptions = {
  timeout: 2500,
  position: 'top center',
};

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store} >
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <NavbarMenu />
              <Alerts />
              <Switch>
                <Route exact path="/"><Home></Home></Route>
                <Route exact path="/posts" component={Posts}></Route>
                <Route exact path="/category" component={Category}></Route>
                <Route exact path="/contact" component={Contact}></Route>
                <Route exact path="/posts/:id/:cat_id?" component={SinglePost}></Route>
                <Protected exact path="/add" component={Addposts}></Protected>
                <Protected exact path="/edit/:id" component={Editposts}></Protected>
                <Protected exact path="/dashboard" component={Dashboard}></Protected>
                <Protected exact path="/profile" component={Profile}></Protected>

                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/logout"><Logout></Logout></Route>
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
