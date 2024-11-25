import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ITransaction } from '../models/SubscriptionModel/ITransaction';
import { HttpClient } from '@angular/common/http';
import { ICreateTransactionResponse } from '../models/ICreateTransactionResponse';
import { Endpoints, VolxyseatEndpoints } from '../volxyseat.endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl = environment.apiUrl;
  endpoints: Endpoints = VolxyseatEndpoints.endpoints;
  constructor(private http: HttpClient) {}

  // Tipando o retorno como Observable<ICreateTransactionResponse>
  post(transaction: ITransaction): Observable<ICreateTransactionResponse> {
    const endpointUrl = this.endpoints.createTransaction(this.apiUrl);
    return this.http.post<ICreateTransactionResponse>(
      `${endpointUrl}`,
      transaction
    );
  }

  // Tipando a resposta do método getById (ajuste de acordo com o que a resposta retorna)
  getById(id: any) {
    const endpointUrl = this.endpoints.getTransactionById(this.apiUrl, id);
    return this.http.get(endpointUrl);
  }

  disableTransaction(id: string) {
    const endpointUrl = this.endpoints.disableTransation(this.apiUrl, id);
    return this.http.put(endpointUrl, {});
  }
}
