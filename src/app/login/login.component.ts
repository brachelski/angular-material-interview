import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  template: `
    <h1>Hey There Buddy</h1>
    <form class="login-form" (ngSubmit)="onSubmit($event)">
      <mat-card>
        <mat-card-title>Login</mat-card-title>
        <mat-card-content>
          <mat-form-field appearance="outline" [formGroup]="userFormGroup">
            <mat-label>User Name</mat-label>
            <mat-error>Required!</mat-error>
            <input
              matInput
              [formControl]="userNameControl"
              placeholder="deez">
          </mat-form-field>
          <mat-form-field appearance="outline" [formGroup]="userFormGroup">
            <mat-label>Password</mat-label>
            <mat-error>Required!</mat-error>
            <input
              matInput
              [type]="showPassword ? 'text' : 'password'"
              [formControl]="passwordControl"
              placeholder="n..s">
            <button
              type="button"
              mat-icon-button
              matSuffix
              (click)="this.showPassword = !this.showPassword">
              <mat-icon>{{!showPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
          </mat-form-field>
        </mat-card-content>
        <mat-card-footer *ngIf="loginStatus === false">
          <mat-error>WOW!</mat-error>
        </mat-card-footer>
        <mat-card-actions>
          <div class="button-container">
            <button
              [disabled]="userFormGroup.invalid"
              mat-raised-button
              color="primary">
              Login
            </button>
          </div>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  loginStatus: boolean | null = null;
  userFormGroup: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  userNameControl: FormControl = this.userFormGroup.controls['username'] as FormControl;
  passwordControl: FormControl = this.userFormGroup.controls['password'] as FormControl;

  constructor(protected loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.getLogInStatus().pipe(
      tap((login: boolean) => {
        console.log(login);
        this.loginStatus = login;
      })
    ).subscribe()
  }

  onSubmit(f: NgForm): void {
    if (this.userFormGroup.valid) {
      this.loginService.login(this.userNameControl.value, this.passwordControl.value);
    }
  }
}
