import { createStore } from 'vuex';
import fileStore from './fileStore';

export interface IRootState {
  root: boolean;
  version: string;
}

export default createStore({
  modules: {
    fileStore,
  },
});
