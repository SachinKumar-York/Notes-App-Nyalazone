import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesManagementRoutingModule } from './notes-management-routing.module';
import { NoteWrapperComponent } from './note-wrapper/note-wrapper.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BinsComponent } from './bins/bins.component';

const routes: Routes = [
  { path: 'bins', component: BinsComponent },
];

@NgModule({
  declarations: [NoteWrapperComponent, 
    BinsComponent
  ],
  imports: [
    CommonModule,
    NotesManagementRoutingModule,
    FormsModule
  ]
})
export class NotesManagementModule { }
