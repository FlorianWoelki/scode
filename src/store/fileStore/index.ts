import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Module } from 'vuex';
import { FileStoreStateTypes, IRootState } from '../interfaces';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
} as Module<FileStoreStateTypes, IRootState>;
