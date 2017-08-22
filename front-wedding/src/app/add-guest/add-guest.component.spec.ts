/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGuestComponent } from './add-guest.component';

describe('AddGuestComponent', () => {
  let component: AddGuestComponent;
  let fixture: ComponentFixture<AddGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
