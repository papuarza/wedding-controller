import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GuestsService } from '../guests.service'
import { MdDialog, MdPaginator } from '@angular/material';
import { EditGuestComponent } from '../edit-guest/edit-guest.component'
import { AddGuestComponent } from '../add-guest/add-guest.component'
import { DeleteGuestComponent } from '../delete-guest/delete-guest.component'
import { DataSource } from '@angular/cdk';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  guests: any;
  displayedColumns = ['DNI', 'Nombre', 'Apellido', 'Apodo', 'Pareja', "Asistencia", 'Asistencia-Pareja', 'Editar-Borrar'];
  exampleDatabase;
  invitationsAmount;
  guestsAmount;
  respondedInvitationsAmount;
  respondedGuestAmount;
  guestPercentage;
  invitationPercentage;
  user
  dataSource: ExampleDataSource | null;

  @ViewChild('filterDesktop') filterDesktop: ElementRef;
  @ViewChild('filterMobile') filterMobile: ElementRef;


  constructor(private guestService: GuestsService, public dialog: MdDialog, private router: Router) {



  }

  ngOnInit() {

    this.guestService.isLoggedIn()
      .subscribe(
      (user) => {
        if(!user.username){
          this.router.navigate(['login'])
        } else {
          this.user = user
          this.guestService.getAllGuests()
          .subscribe(guests => {
            this.guests = guests;
            this.countGuest();
            this.exampleDatabase = new ExampleDatabase(this.guests);
            this.dataSource = new ExampleDataSource(this.exampleDatabase);
            Observable.fromEvent(this.filterDesktop.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
              if (!this.dataSource) { return; }
              this.dataSource.filter = this.filterDesktop.nativeElement.value;
            });
            Observable.fromEvent(this.filterMobile.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
              if (!this.dataSource) { return; }
              this.dataSource.filter = this.filterMobile.nativeElement.value;
            });
          });
        }
      })

  }

  logout() {
  this.guestService.logout()
    .subscribe(
      (msg) => this.router.navigate(['login']),
      (err) => console.log(err)
    );
}

  countGuest() {
    this.invitationsAmount = this.guests.length;
    this.guestsAmount = this.guests.filter(e => e.couple).length + this.invitationsAmount;
    this.respondedInvitationsAmount = this.guests.filter(e => e.assist == true || e.assist == false).length
    this.respondedGuestAmount = this.guests.filter(e => e.coupleAssist).length + this.guests.filter(e => e.assist).length;
    this.guestPercentage = Math.floor(this.respondedGuestAmount / this.guestsAmount * 100);
    this.invitationPercentage = Math.floor(this.respondedInvitationsAmount / this.invitationsAmount * 100);
  }

  openDialog(dni, id) {
    let dialogEditRef = this.dialog.open(EditGuestComponent, {
      height: 'auto',
      width: '300px',
      data: { dni: dni, id: id }
    });
    dialogEditRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      this.guests = this.guests.filter(e => e._id !== result._id);
      this.guests.unshift(result)
      this.updateTable();
    }
    });
  }

  createDialog() {
    let dialogCreateRef = this.dialog.open(AddGuestComponent, {
      height: 'auto',
      width: '300px',
    });
    dialogCreateRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.guests.unshift(result)
        this.updateTable();
      }
    });
  }

  deleteDialog(dni, id) {
    let dialogDeleteRef = this.dialog.open(DeleteGuestComponent, {
      data: { dni: dni, id: id }
    });
    dialogDeleteRef.afterClosed().subscribe(guestId => {
      this.guests = this.guests.filter(e => e._id !== guestId);
      this.updateTable();
    });
  }

  updateTable() {
    this.countGuest();
    this.exampleDatabase = new ExampleDatabase(this.guests);
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
  }
}


export interface UserData {
  id: string,
  dni: string;
  nombre: string;
  apellido: string;
  apodo: string;
  pareja: boolean;
  asistencia: boolean;
  asistenciaPareja: boolean;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }
  guests;
  constructor(guests) {
    this.guests = guests;
    for (let i = 0; i < guests.length; i++) { this.addUser(i); }
  }

  /** Adds a new user to the database. */
  addUser(i) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(i));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(i) {
    return {
      id: this.guests[i]._id,
      dni: this.guests[i].dni,
      nombre: this.guests[i].name,
      apellido: this.guests[i].lastName,
      apodo: this.guests[i].nickname,
      pareja: this.guests[i].couple,
      asistencia: this.guests[i].assist,
      asistenciaPareja: this.guests[i].coupleAssist
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: UserData) => {
        let searchStr = (item.nombre + item.apellido + item.apodo).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}
