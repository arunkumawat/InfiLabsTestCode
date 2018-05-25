import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceAdminComponent } from './components/device-admin.component';

const appRouter: Routes =
    [
        { path: '', redirectTo: 'deviceAdmin', pathMatch: 'full' },
        { path: 'deviceAdmin', component: DeviceAdminComponent },
    ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);