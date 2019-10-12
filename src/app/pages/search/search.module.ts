import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import {MatMenuModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatMenuModule
    ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
