import { Component } from '@angular/core';
import { BlobService } from '../../services/blob.service';
import { TemplatesComponent } from "../../pages/templates/templates.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  blobUrl: string = '';

  constructor(private blobService: BlobService) {}

  ngOnInit(): void {
    this.blobUrl = this.blobService.getBlobUrl();
  }
}
