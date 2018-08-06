// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAgFl527i1jC6Unib9Gpyzyz318vUvMluc',
    authDomain: 'chat-df00f.firebaseapp.com',
    databaseURL: 'https://chat-df00f.firebaseio.com',
    projectId: 'chat-df00f',
    storageBucket: 'chat-df00f.appspot.com',
    messagingSenderId: '784070376324'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
