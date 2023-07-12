import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/** Services */
import { TimezoneService } from './timezone.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [TimezoneService],
  template: `
  <ng-container *ngIf="isHttpReqInProcess">
  Loading....
  </ng-container>
  <ng-container *ngIf="!isHttpReqInProcess">
  <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">

    <div>
      
        <label for="accountType">Account Type:</label>
      
        <select formControlName="accountType" required>
          <option value="personal">Personal</option>
          <option value="company">Company</option>
        </select>

    </div>
  
    <div>
      
        <label for="name">Name:</label>

        <input type="text" id="name" formControlName="name" required>
      
        <div *ngIf="(formGroup.controls.name.dirty || formGroup.controls.name.touched) 
        && formGroup.controls.name.errors?.['required']">
          
          Name is required.

        </div>

    </div>

    <div>
    
        <label for="surname">Surname:</label>
        
        <input type="text" id="surname" formControlName="surname" required>
          
        <div *ngIf="(formGroup.controls.surname.dirty || formGroup.controls.surname.touched) 
        && formGroup.controls.surname.errors?.['required']">
            
          Surname is required.
          
        </div>

    </div>

  <div>
    
        <label for="emailAddress">Email Address:</label>

        <input type="text" id="emailAddress" formControlName="emailAddress" required>
    
        <div *ngIf="(formGroup.controls.emailAddress.dirty || formGroup.controls.emailAddress.touched)
        && formGroup.controls.emailAddress.errors?.['required']">
        
          Email address is required.

        </div>

  </div>

  <div>
    
        <label for="password">Password:</label>
        
        <input type="password" id="password" formControlName="password" required>

        <div *ngIf="(formGroup.controls.password.dirty || formGroup.controls.password.touched)
        && formGroup.controls.password.errors?.['required']">
        
          Password is required.

        </div>

  </div>

  <div>
    
        <label for="currency">Currency:</label>
    
        <select formControlName="currency" required>
              <option value="usd">USD</option>
        </select>

  </div>
  
  <div>
        <label for="timezone">Timezone:</label>
        
        <select formControlName="timezone" required>
              <option [value]="timezone" *ngFor="let timezone of timezones">{{timezone}}</option>
        </select>
  </div>
  <div>
    <label for="country">Country:</label>
    <input type="text" id="country" formControlName="country">
  </div>
  <div>
    <label for="city">City:</label>
    <input type="text" id="city" formControlName="city">
  </div>
  <div>
    <label for="phoneNumber">Phone Number:</label>
    <input type="text" id="phoneNumber" formControlName="phoneNumber">
  </div>
  <div>
    <label for="website">Website:</label>
    <input type="text" id="website" formControlName="website">
  </div>

  <input type="submit" [disabled]="formGroup.invalid"/>

</form>
  </ng-container>
  `,
})
export class App implements OnInit {
  public formGroup: FormGroup = this.fb.group({
    accountType: ['personal', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    emailAddress: ['', Validators.required],
    password: ['', Validators.required],
    currency: ['usd'],
    timezone: [Intl.DateTimeFormat().resolvedOptions().timeZone],
    country: [''],
    city: [''],
    phoneNumber: [''],
    website: [''],
  });

  public timezones: string[] = [];

  public isHttpReqInProcess: boolean = false;

  constructor(private fb: FormBuilder, private timezoneSvc: TimezoneService) {}

  ngOnInit(): void {
    this.isHttpReqInProcess = true;
    this.timezoneSvc.get().subscribe(
      (x) => {
        this.timezones = x;
        this.isHttpReqInProcess = false;
      },
      () => {
        this.timezones = this.timezoneSvc.getHardCodedTimezones();
        this.isHttpReqInProcess = false;
      }
    );
  }

  public onSubmit(): void {
    console.log(this.formGroup.getRawValue());
  }
}

bootstrapApplication(App);
