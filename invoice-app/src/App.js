import logo from './logo.svg';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Router history={createBrowserHistory({})}>
        <Route
          path="/invoices"
          exact
        />
        <Route
          path="/invoices/:id"
          exact
        />
      </Router>
    </React.Fragment>
  );
}

export default App;
