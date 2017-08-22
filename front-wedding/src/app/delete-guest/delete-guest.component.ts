import { Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import { GuestsService } from '../guests.service';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-guest',
  templateUrl: './delete-guest.component.html',
  styleUrls: ['./delete-guest.component.css']
})
export class DeleteGuestComponent implements OnInit {
  userName;
  userLastName;
  guestId;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private guestService: GuestsService,public guestUpdateRef: MdDialogRef<DeleteGuestComponent>) {
    this.guestId = data.id;
    this.guestService.getGuest(data.dni)
      .subscribe(guest => {
        this.userName = guest.name;
        this.userLastName = guest.lastName;
      })

  }

  ngOnInit() {
  }

  deleteGuest(){
    this.guestService.deleteGuest(this.guestId)
    .subscribe(response => {
      this.guestUpdateRef.close(this.guestId)
    })
  }

}
