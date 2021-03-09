import { MutationTree } from 'vuex';
import { SpaceStoreMutationsTypes, SpaceStoreStateTypes } from '../interfaces/spaceStore';
import { MutationTypes } from './mutation-types';

export default {
  [MutationTypes.LOAD_SPACES](state, spaces) {
    state.spaces = spaces;
  },
  [MutationTypes.SELECT_SPACE](state, space) {
    state.selectedSpace = space;
  },
  [MutationTypes.CREATE_SPACE](state, space) {
    state.spaces.push(space);
  },
} as MutationTree<SpaceStoreStateTypes> & SpaceStoreMutationsTypes;
