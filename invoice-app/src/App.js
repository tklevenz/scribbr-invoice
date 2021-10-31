import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import InvoiceList from './components/InvoiceList.jsx';
import InvoiceDetails from './components/InvoiceDetails.jsx';
import invoiceStore from './stores/invoice';
import customerStore from './stores/customer';
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
            <Router>
              <Provider
                invoiceStore={invoiceStore}
                customerStore={customerStore}
              >
                <Route
                  path="/"
                  exact
                  component={InvoiceList}
                />
                <Route
                  path="/:id"
                  exact
                  component={InvoiceDetails}
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
