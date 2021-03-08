import { MutationTree } from 'vuex';
import { SpaceStoreMutationsTypes, SpaceStoreStateTypes } from '../interfaces/spaceStore';
import { MutationTypes } from './mutation-types';

export default {
  [MutationTypes.LOAD_SPACES](state, spaces) {
    state.spaces = spaces;
  },
} as MutationTree<SpaceStoreStateTypes> & SpaceStoreMutationsTypes;
