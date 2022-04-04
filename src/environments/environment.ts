// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  securityPipeline:{
    iv: 'En9BbHwGmuch2EDqweF/Kw==',
    salt: '0uFbhTBMpkhD3Rx6ND/GghWZXoTufH9UnZHhnSJP3j8=',
    password: 'QmRscnAXnDzsnYayo0/HlnCMdVFWXoxkz/NVeIw/7hU='
  },
  gatewayAddress: 'https://localhost:44309'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
