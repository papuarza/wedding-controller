import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../guests.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;

  constructor(private guestService: GuestsService,  private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.guestService.login(this.username, this.password)
      .subscribe(user => {
          this.router.navigate(['control-panel'])
      })
  }

}
