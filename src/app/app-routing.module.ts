import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {path: 'basic-report/:id', loadChildren: () => import('./pages/basic-report/basic-report.module').then(m => m.BasicReportPageModule)},
    {path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule)},
    {path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
