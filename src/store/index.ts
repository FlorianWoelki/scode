import { createStore } from 'vuex';
import fileStore from './fileStore';
import { IRootState } from './interfaces';

export default createStore<IRootState>({
  modules: {
    fileStore,
  },
});
