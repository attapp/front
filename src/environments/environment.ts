// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
<<<<<<< HEAD
    API_ENDPOINT: 'http://191.232.188.6:3000',
=======
    API_ENDPOINT: 'http://191.232.188.6:3000', 
>>>>>>> 890d8f3288a8396ae2ce67e828d04964652b8a8e
    debugMode: true
};


export const TASK_STATE = {
    NOT_START: 1,
    NOT_START_FOR_DEPENDENCY: 2,
    IN_PROGRESS: 3,
    DELAYED_BY_START: 4,
    DELAYED_BY_DEPENDENCY: 5,
    DELAYED_BY_FINISH: 6,
    FINISHED: 7
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
