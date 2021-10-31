import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

class InvoiceStore {
  invoices;

  constructor() {
    this.invoices = new Map();
    makeAutoObservable(this)
  }

  loadInvoices = () => {
    console.log('load invoices')
    // TODO: replace with service call
    let i;
    for (i = 1; i < 5; i += 1) {
      const id = uuid()
      this.invoices.set(id, {
        id,
        description: `Invoice ${i}`,
        total: 10,
      });
    }

    console.log(this.invoices.size);
  }
}

export default new InvoiceStore();
