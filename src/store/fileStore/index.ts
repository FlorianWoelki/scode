import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Module } from 'vuex';
import { IRootState } from '../interfaces';
import { FileStoreStateTypes } from '../interfaces/fileStore';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
} as Module<FileStoreStateTypes, IRootState>;
