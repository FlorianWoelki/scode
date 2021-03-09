import { ActionTree } from 'vuex';
import db from '../../db';
import { IRootState } from '../interfaces';
import { SpaceStoreStateTypes, SpaceStoreActionTypes } from '../interfaces/spaceStore';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';

export default {
  [ActionTypes.LOAD_SPACES]({ commit }) {
    db.transaction('rw', db.spaces, async() => {
      const spaces = await db.spaces.toArray();
      commit(MutationTypes.LOAD_SPACES, spaces);
    });
  },
  [ActionTypes.CREATE_SPACE]({ commit }, space) {
    db.transaction('rw', db.spaces, async() => {
      await db.spaces.add(space);
      commit(MutationTypes.CREATE_SPACE, space);
    });
  },
} as ActionTree<SpaceStoreStateTypes, IRootState> & SpaceStoreActionTypes;
