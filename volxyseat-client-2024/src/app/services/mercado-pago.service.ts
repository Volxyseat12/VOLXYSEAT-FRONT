import { Injectable } from '@angular/core';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private mercadoPago: any;

  constructor() {
    this.mercadoPago = new window.MercadoPago('TEST-4679837029437600-102809-137cb3af76c246ba3bcbfb324fdbafbe-1569614916', {
      locale: 'pt-BR',
    });
  }

  createCardForm() {
    return this.mercadoPago.cardForm({
      amount: '2.00',
      iframe: true,
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Nome impresso no cartão',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número do cartão',
        },
        cardExpirationDate: {
          id: 'form-checkout__cardExpirationDate',
          placeholder: 'Data de vencimento (MM/YY)',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de segurança',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Parcelas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número do documento',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emissor',
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onFormUnmounted: (error: any) => {
          if (error) return console.warn('Form Unmounted handling error: ', error);
          console.log('Form unmounted');
        },
        onIdentificationTypesReceived: (error: any, identificationTypes: any) => {
          if (error) return console.warn('identificationTypes handling error: ', error);
          console.log('Identification types available: ', identificationTypes);
        },
        onPaymentMethodReceived: (error: any, paymentMethod: any) => {
          if (error) return console.warn('Payment Method handling error: ', error);
          console.log('Payment Method available: ', paymentMethod);
        },
        onIssuersReceived: (error: any, issuers: any) => {
          if (error) return console.warn('Issuers handling error: ', error);
          console.log('Issuers available: ', issuers);
        },
        onInstallmentsReceived: (error: any, installments: any) => {
          if (error) return console.warn('Installments handling error: ', error);
          console.log('Installments available: ', installments);
        },
        onCardTokenReceived: (error: any, token: any) => {
          if (error) return console.warn('Token handling error: ', error);
          console.log('Token available: ', token);
        },
        onSubmit: (event: any) => {
          event.preventDefault();

          const {
            paymentMethodId,
            issuerId,
            cardholderEmail,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = this.mercadoPago.cardForm().getCardFormData();

          console.log('Payment Data:', {
            paymentMethodId,
            issuerId,
            cardholderEmail,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          });

        },
      },
    });
  }
}
