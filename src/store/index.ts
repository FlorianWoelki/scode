import { createStore } from 'vuex';
import fileStore from './files';

export default createStore({
  modules: {
    fileStore,
  },
});
