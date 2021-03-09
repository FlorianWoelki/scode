import { ActionTypes as fileStoreTypes } from './fileStore/action-types';
import { ActionTypes as spaceStoreTypes } from './spaceStore/action-types';

export const AllActionTypes = {
  CREATE_FILE: `fileStore/${fileStoreTypes.CREATE_FILE}`,
  DELETE_FILE: `fileStore/${fileStoreTypes.DELETE_FILE}`,
  LOAD_FILES: `fileStore/${fileStoreTypes.LOAD_FILES}`,
  UPDATE_FILE: `fileStore/${fileStoreTypes.UPDATE_FILE}`,
  UPDATE_FILENAME: `fileStore/${fileStoreTypes.UPDATE_FILENAME}`,
  LOAD_SPACES: `spaceStore/${spaceStoreTypes.LOAD_SPACES}`,
  CREATE_SPACE: `spaceStore/${spaceStoreTypes.CREATE_SPACE}`,
};
