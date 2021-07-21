import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-card>
      <mat-card-title>{{content}}</mat-card-title>
      <button mat-raised-button color="accent" (click)="click()" [disabled]="clickCount >= 10">Click Me!</button>
    </mat-card>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  content = 'Button Not Clicked';
  clickCount = 0;

  constructor() {
  }

  click() {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.content = `Button Clicked ${this.clickCount} Time!`;
    } else {
      this.content = `Button Clicked ${this.clickCount} Times!`;
    }
  }
}
