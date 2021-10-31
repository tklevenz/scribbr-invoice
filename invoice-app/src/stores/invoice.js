import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

class InvoiceStore {
  invoices;

  constructor() {
    this.invoices = new Map();

    makeAutoObservable(this)
  }

  loadInvoices = () => {
    // TODO: service call to load invoices
  }

  loadInvoice = (id) => {
    // TODO: service call to load single invoice
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
}

export default new InvoiceStore();
