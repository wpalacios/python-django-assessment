import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';
import './css/styles.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/movies">
            <Main />
          </Route>
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default App;
