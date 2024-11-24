import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ITransaction } from '../models/SubscriptionModel/ITransaction';
import { HttpClient } from '@angular/common/http';
import { VolxyseatEndpoints } from '../volxyseat.endpoints';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  post(transaction: ITransaction) {
    const endpointUrl = VolxyseatEndpoints.endpoints.createTransaction(
      this.apiUrl
    );
    console.log(endpointUrl);
    return this.http.post(`${endpointUrl}`, transaction);
  }

  getById(id: any) {
    const endpointUrl = VolxyseatEndpoints.endpoints.getTransactionById(
      this.apiUrl,
      id
    );
    return this.http.get(endpointUrl);
  }
}
