import { ActionContext } from 'vuex';
import { IFile } from '../../db';
import { ActionTypes } from '../fileStore/action-types';
import { MutationTypes } from '../fileStore/mutation-types';
import { IRootState } from '../interfaces';

export interface FileStoreStateTypes {
  files: IFile[];
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
  [MutationTypes.LOAD_FILES](state: S, files: IFile[]): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof FileStoreMutationsTypes>(
    key: K,
    payload: Parameters<FileStoreMutationsTypes[K]>[1],
  ): ReturnType<FileStoreMutationsTypes[K]>;
} & Omit<ActionContext<FileStoreStateTypes, IRootState>, 'commit'>;

export interface FileStoreActionTypes {
  [ActionTypes.CREATE_FILE]({ commit }: AugmentedActionContext, fileDetails: IFile): IFile;
  [ActionTypes.LOAD_FILES]({ commit }: AugmentedActionContext): IFile;
  [ActionTypes.UPDATE_FILE]({ commit }: AugmentedActionContext, file: IFile): IFile;
  [ActionTypes.UPDATE_FILENAME]({ commit }: AugmentedActionContext, { id, name }: { id: string, name: string }): IFile;
  [ActionTypes.DELETE_FILE]({ commit }: AugmentedActionContext, id: string): IFile;
}
