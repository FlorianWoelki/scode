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
  [ActionTypes.UPDATE_SPACENAME]({ commit }, { id, name }) {
    db.transaction('rw', db.spaces, () => {
      setTimeout(() => {
        db.spaces.update(id, { name });
        commit(MutationTypes.UPDATE_SPACENAME, { id, name });
      }, 0);
    });
  },
} as ActionTree<SpaceStoreStateTypes, IRootState> & SpaceStoreActionTypes;
