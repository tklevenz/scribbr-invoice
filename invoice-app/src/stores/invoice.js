import { makeAutoObservable, toJS } from 'mobx';
import { v4 as uuid } from 'uuid';

class InvoiceStore {
  invoices;

  constructor() {
    this.invoices = new Map();

    makeAutoObservable(this)
  }

  loadInvoices = () => {
    fetch('/invoices')
      .then(res => res.json())
      .then(invoices => {
        if (invoices && invoices.length) {
          for (const invoice of invoices) {
            this.invoices.set(invoice.id, invoice);
          }
        }
      });
  }

  saveInvoice = (id, callback) => {
    console.log('save invoice');
    const invoice = this.invoices.get(id);

    fetch('/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toJS(invoice)),
    })
      .then(res => {
        console.log('post ok');
        if (callback) {
          callback();
        }
      })
      .catch(error => {
        console.log('error posting invoice', error);
        if (callback) {
          callback(error);
        }
      });
  }

  // could probably be more efficient, get from an API call instead
  getNewInvoiceNumber = () => {
    if (this.invoices.size) {
      return [...this.invoices.values()].map(invoice => invoice.number).reduce((a, b) => (Math.max(a, b))) + 1;
    }

    return 1;
  }

  updateInvoice = (id, updatedInvoice) => {
    this.invoices.set(id, updatedInvoice);
  }

  getInvoiceTotal = (id) => {
    const { lineItems } = this.invoices.get(id);

    if (lineItems && lineItems.length) {
      return lineItems.reduce((acc, cur) => acc + cur.hours * cur.rate, 0)
    }

    return 0;
  }

  addNewInvoice = (callback) => {
    const id = uuid();

    const invoiceNumber = this.getNewInvoiceNumber()

    this.invoices.set(id, {
      id,
      description: `Invoice ${invoiceNumber}`,
      customerId: '1',
      number: invoiceNumber,
      status: 'open',
      lineItems: [{
        id: uuid(),
        description: '',
        hours: '',
        rate: '',
      }],
    });

    callback(id);
  }

  emailInvoice = (id, email) => {
    this.saveInvoice(id, (error) => {
      if (!error) {
        fetch(`/email_invoice/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        })
          .then(res => console.log('email ok'))
          .catch(error => console.log('error posting email'));
      }
    });
  }
}

export default new InvoiceStore();
