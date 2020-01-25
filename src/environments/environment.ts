// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import { IEnvironment } from '@oam/webem/environments/environment.interface';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { globalStateSanitizer } from '@oam/webem/instrumentation/state-sanitizers';
import {IEnvironment} from './environment.interface';

export const environment: IEnvironment = {
    production: false,
    version: '0.0.0',
    instrumentation: StoreDevtoolsModule.instrument({
        // stateSanitizer: globalStateSanitizer
    })
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
