import { createStore } from 'vuex';
import fileStore from './fileStore';
import spaceStore from './spaceStore';
import { IRootState } from './interfaces';

export default createStore<IRootState>({
  modules: {
    fileStore,
    spaceStore,
  },
});
