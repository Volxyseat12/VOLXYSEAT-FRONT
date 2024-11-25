import { Component } from '@angular/core';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BlobService } from '../../services/blob.service';

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
  blobUrl: string = '';

  constructor(private blobService: BlobService) {}

  ngOnInit(): void {
    this.blobUrl = this.blobService.getBlobUrl();
  }
}
