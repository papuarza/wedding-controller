import { Component, OnInit, Inject } from '@angular/core';
import { GuestsService } from '../guests.service'
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  guest: any = '';
  dni: Number = 3415680;
  asistencia: Boolean;
  asistenciaPareja: Boolean;

  constructor(
    private guestService: GuestsService,
    public guestUpdateRef: MdDialogRef<ConfirmDialogComponent>,
    private router: Router,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.dni = data;
    this.guestService.getGuest(this.dni)
      .subscribe(guest => {
        console.log(guest)
        this.guest = guest;
        guest !== null ? this.asistencia = guest.assist : this.asistencia = null;;
        guest !== null ? this.asistenciaPareja = guest.coupleAssist : this.asistenciaPareja = null;
    })

   }

  ngOnInit() {

  }


  setAssistance() {
    this.asistencia === false ? this.asistenciaPareja === false : "";
    this.guestService.confirmGuest(this.asistencia, this.asistenciaPareja, this.dni)
    .subscribe(guest => {
      this.guest = guest;
      console.log(this.guest);
      this.guestUpdateRef.close()
      this.router.navigate(['confirmation', this.guest.dni])
    })

  }

}
