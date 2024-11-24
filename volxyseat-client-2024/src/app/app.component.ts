import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularToastifyModule } from 'angular-toastify';
import { CookiepopupComponent } from "./components/cookiepopup/cookiepopup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AngularToastifyModule, CookiepopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'volxyseat-client';

  cookies: string | null = '';

  constructor() {
    this.cookies = localStorage.getItem('cookies');
  }
}
