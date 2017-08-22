import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import { GuestsService } from '../guests.service';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.css']
})
export class EditGuestComponent implements OnInit {
  formInfo = {
    id: '',
    dni: '',
    name: '',
    lastName: '',
    nickname: '',
    couple: ''
  }
  isValidForm;
  error;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private guestService: GuestsService,public guestUpdateRef: MdDialogRef<EditGuestComponent> ) {
    this.formInfo.id = data.id;
    this.guestService.getGuest(data.dni)
      .subscribe(guest => {
        this.formInfo.dni = guest.dni;
        this.formInfo.name = guest.name;
        this.formInfo.lastName = guest.lastName;
        this.formInfo.nickname = guest.nickname;
        this.formInfo.couple = guest.couple;
      }),
      (err => this.error = err)
   }

  ngOnInit() {
  }

  editGuest() {
    this.guestService.editGuest(this.formInfo)
    .subscribe(guest => {
      this.guestUpdateRef.close(guest)
    })
  }

  checkInput() {
    if(this.formInfo.dni !== '' && this.formInfo.name !== '' && this.formInfo.lastName !== '') {
      this.isValidForm = true;
    }
  }

}
