// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: 'http://ourtaberna-en.jsktech.feathertest.com/rest/V1/customer/token',

  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyCMYc0yEP4cdwGkXN7LmaWxyoS2arXOomE",
    authDomain: "report-damages.firebaseapp.com",
    databaseURL: "https://report-damages.firebaseio.com",
    projectId: "report-damages",
    storageBucket: "",
    messagingSenderId: "145444048279"
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
