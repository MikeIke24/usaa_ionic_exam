import {NgModule} from '@angular/core';
import {PreloadAllModules, RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {CacheRouteReuseStrategy} from './cache-route-reuse.strategy';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'app/search',
        pathMatch: 'full'
    },
    {
        path: 'app', children: [
            {
                path: '',
                redirectTo: 'search',
                pathMatch: 'full'
            },
            {
                path: 'basic-report/:id',
                data: {cacheParent: 'app'},
                loadChildren: () => import('./pages/basic-report/basic-report.module').then(m => m.BasicReportPageModule)
            },
            {
                path: 'favorites',
                data: {cacheParent: 'app'},
                loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
            },
            {
                path: 'search',
                data: {cacheParent: 'app'},
                loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
            },
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: CacheRouteReuseStrategy
        }
    ]
})
export class AppRoutingModule {
}
