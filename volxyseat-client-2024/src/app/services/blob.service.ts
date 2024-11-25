import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlobService {
  private blobUrl = environment.blobAzure;

  constructor() {}

  getBlobUrl(): string {
    return this.blobUrl;
  }
}
