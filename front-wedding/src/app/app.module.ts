import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";

import {MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdSlideToggleModule, MdSortModule, MdTableModule, MdGridListModule, MdIconModule, MdPaginator} from '@angular/material';

import { CdkTableModule } from '@angular/cdk';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
import { ConfirmationThanksComponent } from './confirmation-thanks/confirmation-thanks.component'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { GuestsService } from './guests.service'
import { AddGuestComponent } from './add-guest/add-guest.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
import { DeleteGuestComponent } from './delete-guest/delete-guest.component';
import { LoginComponent } from './login/login.component';
import {CountDown} from "../../node_modules/angular2-simple-countdown/countdown";



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'confirmation/:id', component: ConfirmationThanksComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmDialogComponent,
    ConfirmationThanksComponent,
    ControlPanelComponent,
    EditGuestComponent,
    AddGuestComponent,
    DeleteGuestComponent,
    LoginComponent,
    CountDown
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdSlideToggleModule,MdSortModule, MdTableModule,CdkTableModule,MdGridListModule, MdIconModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditGuestComponent,
    AddGuestComponent,
    DeleteGuestComponent
  ],
  providers: [ GuestsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
