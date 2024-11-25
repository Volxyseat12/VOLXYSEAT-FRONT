import { Component } from '@angular/core';
import { BlobService } from '../../services/blob.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  blobUrl: string = '';

  constructor(private blobService: BlobService) {}

  ngOnInit(): void {
    this.blobUrl = this.blobService.getBlobUrl();
  }
}
