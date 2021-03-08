import { ActionContext } from 'vuex';
import { ISpace } from '../../db';
import { IRootState } from '../interfaces';
import { ActionTypes } from '../spaceStore/action-types';
import { MutationTypes } from '../spaceStore/mutation-types';

export interface SpaceStoreStateTypes {
  spaces: ISpace[];
  selectedSpace?: ISpace;
  rootDispatch?: boolean;
}

export type SpaceStoreMutationsTypes<S = SpaceStoreStateTypes> = {
  [MutationTypes.LOAD_SPACES](state: S, spaces: ISpace[]): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof SpaceStoreMutationsTypes>(
    key: K,
    payload: Parameters<SpaceStoreMutationsTypes[K]>[1],
  ): ReturnType<SpaceStoreMutationsTypes[K]>;
} & Omit<ActionContext<SpaceStoreStateTypes, IRootState>, 'commit'>;

export interface SpaceStoreActionTypes {
  [ActionTypes.LOAD_FILES]({ commit }: AugmentedActionContext): ISpace[];
}
