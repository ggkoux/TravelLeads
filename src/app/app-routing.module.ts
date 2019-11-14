import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsComponent } from './docs/docs.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { DocDetailComponent } from './doc-detail/doc-detail.component';

const routes: Routes =[
  { path: 'docs', component: DocsComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: DocDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
