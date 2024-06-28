import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signup',
    pathMatch: 'full'
  },
  {
    path: 'notes-management',
    loadChildren: () => import('./Views/notes-management/notes-management.module').then(m => m.NotesManagementModule)
  },
  {
    path: 'sessions',
    loadChildren: () => import('./Views/sessions/sessions.module').then(m => m.SessionsModule)
  },
  {
    path: 'bins',
    loadChildren: () => import('./Views/notes-management/notes-management.module').then(m => m.NotesManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


