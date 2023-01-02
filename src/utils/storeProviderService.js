import {Store} from 'redux';

class StoreProviderService {
  init(configureStore) {
    store = configureStore();
  }
  getStore() {
    return Store;
  }
  get state() {
    return this.getStore().getState();
  }
  get internetStatus() {
    return this.state.internetConnectivity?.data;
  }
  get dispatch() {
    return this.getStore().dispatch;
  }
}
const storeProviderService = new StoreProviderService();
export {storeProviderService as StoreProviderService};
