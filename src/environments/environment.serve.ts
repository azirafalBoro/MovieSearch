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
