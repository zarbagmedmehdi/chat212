import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabPage } from './tab.page';

const routes: Routes = [
    {
        path: '',
        component: TabPage,
        children:
            [
                {
                    path: 'profile',

                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../profile/profile.module#ProfilePageModule'
                            }
                        ]
                },



            ]
    },
    {
        path: '',
        redirectTo: '/tab/profile',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabPageRoutingModule {}
