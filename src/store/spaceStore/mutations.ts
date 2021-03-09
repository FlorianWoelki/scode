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
  [MutationTypes.UPDATE_SPACENAME](state, { id, name }) {
    const filteredSpace = state.spaces.filter((space) => space.id === id);
    if (filteredSpace[0]) {
      filteredSpace[0].name = name;
    }
  },
} as MutationTree<SpaceStoreStateTypes> & SpaceStoreMutationsTypes;
