import { Component } from '@angular/core';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SubscriptionComponent,
    AboutComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
