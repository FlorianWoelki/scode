import { createStore } from 'vuex';
import fileStore from './fileStore';

export default createStore({
  modules: {
    fileStore,
  },
});
