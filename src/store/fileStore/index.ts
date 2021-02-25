import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { IFile } from '../../db';
import { ActionContext, Module } from 'vuex';
import { IRootState } from '..';

export enum MutationTypes {
  CREATE_FILE = 'CREATE_FILE',
  SET_SELECTED_FILE = 'SET_SELECTED_FILE',
  UPDATE_FILE = 'UPDATE_FILE',
  DELETE_FILE = 'DELETE_FILE',
}

export enum ActionTypes {
  CREATE_FILE = 'CREATE_FILE',
}

export interface FileStoreStateTypes {
  files?: IFile[];
  selectedFile?: IFile;
  rootDispatch?: boolean;
}

export interface FileStoreGettersTypes {
  lastUsedCodeLanguage(state: FileStoreStateTypes): string;
}

export type FileStoreMutationsTypes<S = FileStoreStateTypes> = {
  [MutationTypes.CREATE_FILE](state: S, file: IFile): void;
  [MutationTypes.SET_SELECTED_FILE](state: S, file: IFile | undefined): void;
  [MutationTypes.UPDATE_FILE](state: S, payload: { id: string, file: IFile }): void;
  [MutationTypes.DELETE_FILE](state: S, id: string): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof FileStoreMutationsTypes>(
    key: K,
    payload: Parameters<FileStoreMutationsTypes[K]>[1],
  ): ReturnType<FileStoreMutationsTypes[K]>;
} & Omit<ActionContext<FileStoreStateTypes, IRootState>, 'commit'>;

export interface FileStoreActionTypes {
  [ActionTypes.CREATE_FILE]({ commit }: AugmentedActionContext, fileDetails: IFile): IFile;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
} as Module<FileStoreStateTypes, IRootState>;
