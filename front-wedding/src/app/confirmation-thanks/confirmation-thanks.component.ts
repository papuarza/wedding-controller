import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuestsService } from '../guests.service'

@Component({
  selector: 'app-confirmation-thanks',
  templateUrl: './confirmation-thanks.component.html',
  styleUrls: ['./confirmation-thanks.component.css']
})
export class ConfirmationThanksComponent implements OnInit {
  guestId: String;
  guest;
  time;
  constructor(private route: ActivatedRoute, private guestService: GuestsService){
    setInterval(() => {
      this.time = this.guestService.refreshToken();
    }, 1000);
    this.route.params
      .subscribe((params) => {
        this.guestService.getGuest(+params['id'])
          .subscribe(guest => {
            this.guest = guest;
        })
    });


   }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.guestId = params['id'];
        this.guestService.getGuest(this.guestId)
          .subscribe(guest => {
            this.guest = guest;
            console.log(this.guest)
          })
    });
  }

}
