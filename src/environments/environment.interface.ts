import { ModuleWithProviders } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export interface IEnvironment {
    production: boolean;
    version: string;
    instrumentation: ModuleWithProviders<StoreDevtoolsModule> | [];
}
