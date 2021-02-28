import { ActionTypes as fileStoreTypes } from './fileStore/action-types';

export const AllActionTypes = {
  CREATE_FILE: `fileStore/${fileStoreTypes.CREATE_FILE}`,
  LOAD_FILES: `fileStore/${fileStoreTypes.LOAD_FILES}`,
  UPDATE_FILE: `fileStore/${fileStoreTypes.UPDATE_FILE}`,
};
