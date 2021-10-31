import { makeAutoObservable } from 'mobx';

class CustomerStore {
  customers;

  constructor() {
    this.customers = new Map([
      ['1', {
        id: '1',
        name: 'Scribbr',
        address: 'Singel 542',
        city: 'Amsterdam',
      }],
      ['2', {
        id: '2',
        name: 'Tobias',
        address: 'Donkerstraat 17a',
        city: 'Utrecht',
      }]
    ]);
    makeAutoObservable(this);
  }
}

export default new CustomerStore();
