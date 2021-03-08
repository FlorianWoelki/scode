import { ActionTree } from 'vuex';
import db from '../../db';
import { IRootState } from '../interfaces';
import { SpaceStoreStateTypes, SpaceStoreActionTypes } from '../interfaces/spaceStore';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';

export default {
  [ActionTypes.LOAD_FILES]({ commit }) {
    db.transaction('rw', db.files, async() => {
      const spaces = await db.spaces.toArray();
      commit(MutationTypes.LOAD_SPACES, spaces);
    });
  },
} as ActionTree<SpaceStoreStateTypes, IRootState> & SpaceStoreActionTypes;
