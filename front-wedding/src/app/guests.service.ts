import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class GuestsService {
  BASE_URI = environment.BASE_URL;
  options = {withCredentials: true}
  endDate = new Date(2017, 9, 28).getTime()

  constructor(private http: Http) {

  }
  handleError(e) {
    return Observable.throw(e.json().message);
  }
  getGuest(dni) {
    return this.http.get(this.BASE_URI+"/get-guest/"+dni)
      .map((res) => res.json());
  }

  confirmGuest(assist, coupleAssist, dni) {
    return this.http.post(this.BASE_URI+"/confirm-assist", {assist: assist, coupleAssist: coupleAssist, dni: dni})
      .map((res) => res.json());
  }

  getAllGuests () {
    return this.http.get(this.BASE_URI+"/get-all-guest")
      .map((res) => res.json());
  }

  addGuest(formInfo) {
    return this.http.post(this.BASE_URI+"/guest/create", {formInfo: formInfo})
      .map((res) => res.json())
      .catch(this.handleError);
  }

  editGuest(formInfo) {
    return this.http.post(this.BASE_URI+"/guest/edit", {formInfo: formInfo})
      .map((res) => res.json())
      .catch(this.handleError);
  }

  deleteGuest(guestId) {
    return this.http.post(this.BASE_URI+"/guest/delete", {guestId: guestId})
      .map((res) => res.json());
  }

  login(username, password) {
    return this.http.post(this.BASE_URI+"/login", {username: username, password: password}, {withCredentials:true})
      .map((res) => res.json());
  }

  isLoggedIn() {
    return this.http.get(this.BASE_URI+`/loggedin`,{withCredentials:true})
      .map(res => res.json())
      // .catch(this.handleError);
  }

  logout() {
    return this.http.post(this.BASE_URI+`/logout`, {}, {withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  refreshToken() {
    let remaingDays = Math.floor((this.endDate - new Date().getTime())/(1000*60*60*24));
    let remaingHours = Math.floor((this.endDate - new Date().getTime()-(remaingDays*1000*60*60*24))/(1000*60*60));
    let remaingMinutes = Math.floor((this.endDate - (new Date().getTime()+(remaingDays*1000*60*60*24)+(remaingHours*1000*60*60)))/(1000*60));
    let remaingSeconds = Math.floor((this.endDate - (new Date().getTime()+(remaingDays*1000*60*60*24)+(remaingHours*1000*60*60)+(remaingMinutes*1000*60)))/(1000));


    return {days: remaingDays, hours: remaingHours, minutes: remaingMinutes, seconds: remaingSeconds}
  }

}
