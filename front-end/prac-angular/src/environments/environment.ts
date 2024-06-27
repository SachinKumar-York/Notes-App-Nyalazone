// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //since routes dont change so didnt even need to put them here
  apiUrl: 'http://localhost:8080/',
  endpoints: {
    addNote: 'add_note',
    updateNote: 'update_note',
    deleteNote: 'delete_note',
    signup: 'sign_up',
    signin: 'sign_in',
    getAllNotes: 'get_all',
    changeNoteStatus: 'change_note_status'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
