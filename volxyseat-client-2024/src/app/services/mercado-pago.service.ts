import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints, VolxyseatEndpoints } from '../volxyseat.endpoints';
import { environment } from '../environments/environment';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  apiUrl: string = environment.apiUrl;
  endpoints: Endpoints = VolxyseatEndpoints.endpoints;
  constructor(private http: HttpClient) {}

  createMercadoPagoSubscription(subscriptionRequest: any) {
    const createSubscriptionUrl = this.endpoints.createMPSubscription(
      this.apiUrl
    );

    return this.http.post(`${createSubscriptionUrl}`, subscriptionRequest);
  }

  cancelMercadoPagoSubscription(id: string) {
    const cancelMercadoPagoSubscriptionUrl =
      this.endpoints.calcelMPSubscription(this.apiUrl, id);

    return this.http.put(`${cancelMercadoPagoSubscriptionUrl}`, {});
  }
}
