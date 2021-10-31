import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import InvoiceList from './components/InvoiceList.jsx';
import invoiceStore from './stores/invoice';
import './App.css';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <p>
            Invoices
          </p>
        </header>
        <div className="App-content">
          <div className="App-inner-content">
            <Router history={createBrowserHistory({})}>
              <Provider
                invoiceStore={invoiceStore}
              >
                <Route
                  path="/"
                  exact
                  component={InvoiceList}
                />
                <Route
                  path="/invoices/:id"
                  exact
                />
              </Provider>
            </Router>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}

export default App;
