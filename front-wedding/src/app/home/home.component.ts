import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { GuestsService } from '../guests.service'
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  guest: Object;
  dni: Number;
  text: any = { "Weeks": "",
    "Days": "", "Hours": "",
     "Minutes": "", "Seconds": "",
    "MilliSeconds":"MilliSeconds" };
  textDays: any = { "Days": "" };
  time;

  constructor(public dialog: MdDialog, private guestService: GuestsService) {
    setInterval(() => {
      this.time = this.guestService.refreshToken();
    }, 1000);
  }

  ngOnInit() {
  }

  openDialog() {
  this.dialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '450px',
      data: this.dni
    });
  }





}
