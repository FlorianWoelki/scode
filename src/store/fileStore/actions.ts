import db, { IFile } from '../../db';

export default {
  createFile({ commit, dispatch }, fileDetails: IFile): IFile {
    console.log(fileDetails);
    db.files.add(fileDetails, 'id').catch((error) => {
      console.error(error);
    });
    commit('createFile', fileDetails);
    return fileDetails;
  },
};
