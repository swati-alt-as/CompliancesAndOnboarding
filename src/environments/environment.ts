// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyABYJwg3J8Q1Plv0JX1HlrGxGP_6FgmX1Q",
    authDomain: "test-app-89ffe.firebaseapp.com",
    projectId: "test-app-89ffe",
    storageBucket: "test-app-89ffe.appspot.com",
    messagingSenderId: "76440675860",
    appId: "1:76440675860:web:9a0cb9294551b6ed966901",
    measurementId: "G-5FW9NQN7Q9"
  },
  hmr: false,
  apiUrl: 'http://localhost:4000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
