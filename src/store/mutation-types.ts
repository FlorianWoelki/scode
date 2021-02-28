import { MutationTypes as fileStoreTypes } from './fileStore/mutation-types';

export const AllMutationTypes = {
  CREATE_FILE: `fileStore/${fileStoreTypes.CREATE_FILE}`,
  DELETE_FILE: `fileStore/${fileStoreTypes.DELETE_FILE}`,
  SET_SELECTED_FILE: `fileStore/${fileStoreTypes.SET_SELECTED_FILE}`,
  UPDATE_FILE: `fileStore/${fileStoreTypes.UPDATE_FILE}`,
  LOAD_FILES: `fileStore/${fileStoreTypes.LOAD_FILES}`,
};
