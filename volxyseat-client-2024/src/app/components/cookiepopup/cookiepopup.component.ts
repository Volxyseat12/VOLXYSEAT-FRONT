import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookiepopup',
  standalone: true,
  imports: [],
  templateUrl: './cookiepopup.component.html',
  styleUrl: './cookiepopup.component.css',
})
export class CookiepopupComponent {
  showCookies: boolean = true;

  constructor(private cookieService: CookieService) {
  }

  acceptCookies() {
    this.cookieService.set('cookies_accepted', 'true', 1);
    this.showCookies = false;
    localStorage.setItem('cookies', 'true')
  }

  declineCookies() {
    this.cookieService.set('cookies_declined', 'false', 1);
    this.showCookies = false;
    localStorage.setItem('cookies', 'false')
  }
}
