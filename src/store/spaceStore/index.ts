import { Module } from 'vuex';
import { IRootState } from '../interfaces';
import { SpaceStoreStateTypes } from '../interfaces/spaceStore';
import state from './state';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<SpaceStoreStateTypes, IRootState>;
