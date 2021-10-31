import React, { useContext, useEffect } from 'react';
import { observer, MobXProviderContext } from 'mobx-react';

const InvoiceList = observer(() => {
  const { invoiceStore } = useContext(MobXProviderContext);

  useEffect(() => {
    invoiceStore.loadInvoices();
  }, [invoiceStore])

  return (
    <React.Fragment>
      <div>Invoice List</div>
      { invoiceStore.invoices.size && [...invoiceStore.invoices.values()].map(invoice => (
        <div key={invoice.id}>
          <p>{invoice.description}</p>
        </div>
      ))}
    </React.Fragment>
  )
});

export default InvoiceList;