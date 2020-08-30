import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import './css/styles.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Footer />
      </Fragment>
    )
  }
}

export default App;
