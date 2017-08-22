import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { GuestsService } from '../guests.service'

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {
  formInfo = {
    dni: '',
    name: '',
    lastName: '',
    nickname: '',
    couple: ''
  }
  guest;
  error;
  isValidForm: boolean = false;

  constructor(private guestService: GuestsService,public guestUpdateRef: MdDialogRef<AddGuestComponent>) {}

  ngOnInit() {
  }

  addGuest() {
    this.guestService.addGuest(this.formInfo)
    .subscribe(guest => this.guestUpdateRef.close(guest),
              (err => this.error = err)
  )}

  checkInput() {
    if(this.formInfo.dni !== '' && this.formInfo.name !== '' && this.formInfo.lastName !== '') {
      this.isValidForm = true;
    }
  }


}
