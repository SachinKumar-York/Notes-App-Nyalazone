import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { BlankComponent } from './blank/blank.component';


@NgModule({
  declarations: [LoggedOutComponent, LoggedInComponent, BlankComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
