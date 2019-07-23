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
                {
                    path: 'search',

                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../search/search.module#SearchPageModule'
                            }
                        ]
                },
                {
                    path: 'conversations',

                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../conversations/conversations.module#ConversationsPageModule'
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
