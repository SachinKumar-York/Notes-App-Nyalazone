import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BinsComponent } from './bins/bins.component';
import { NoteWrapperComponent } from './note-wrapper/note-wrapper.component';

const routes: Routes = [
  { path: 'bins', component: BinsComponent },
  { path: 'note-wrapper', component: NoteWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesManagementRoutingModule { }

