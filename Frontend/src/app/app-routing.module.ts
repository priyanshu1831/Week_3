import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LeaveFormComponent } from './leave-form/leave-form.component';

import { ShowdataComponent } from './showdata/showdata.component';

 

const routes: Routes = [

  { path: '', redirectTo: '/leave', pathMatch: 'full' },

  { path: 'leave', component: LeaveFormComponent, data: { title: 'Leave Form' } },

  { path: 'showData', component: ShowdataComponent, data: { title: 'Data Page' } }
  
];

 

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { } 