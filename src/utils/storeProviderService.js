import {Store} from 'redux';
let store;

class StoreProviderService {
  init(configureStore) {
    store = configureStore();
  }
  getStore() {
    return store;
  }
  get state() {
    return this.getStore().getState();
  }
  get internetStatus() {
    return this.state.login.isNetworkConnected;
  }
  get dispatch() {
    return this.getStore().dispatch;
  }
}
const storeProviderService = new StoreProviderService();
export {storeProviderService as StoreProviderService};
