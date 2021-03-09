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
  [MutationTypes.SELECT_SPACE](state: S, space: ISpace): void;
  [MutationTypes.CREATE_SPACE](state: S, space: ISpace): void;
  [MutationTypes.UPDATE_SPACENAME](state: S, { id, name }: { id: number, name: string }): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof SpaceStoreMutationsTypes>(
    key: K,
    payload: Parameters<SpaceStoreMutationsTypes[K]>[1],
  ): ReturnType<SpaceStoreMutationsTypes[K]>;
} & Omit<ActionContext<SpaceStoreStateTypes, IRootState>, 'commit'>;

export interface SpaceStoreActionTypes {
  [ActionTypes.LOAD_SPACES]({ commit }: AugmentedActionContext): ISpace[];
  [ActionTypes.CREATE_SPACE]({ commit }: AugmentedActionContext, space: ISpace): void;
  [ActionTypes.UPDATE_SPACENAME]({ commit }: AugmentedActionContext, { id, name }: { id: number, name: string }): void;
}
