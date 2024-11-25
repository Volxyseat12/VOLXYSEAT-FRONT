import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SubscriptionService } from '../../services/subscription.service';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { CommonModule } from '@angular/common';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';
import { ICreateSubscription } from '../../models/MercadoPago/ICreateSubscription';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { environment } from '../../environments/environment';
import { SuccessComponent } from '../../components/success/success.component';
import { FailComponent } from '../../components/fail/fail.component';
import { Router } from '@angular/router';
import { IPreApprovalResponse } from '../../models/MercadoPago/IPreApprovalResponse';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TransactionService } from '../../services/transaction.service';
import { ICreateTransactionResponse } from '../../models/ICreateTransactionResponse';
import { ToastService } from 'angular-toastify';
declare var MercadoPago: any;

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    HeaderComponent,
    FooterComponent,
  ],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentComponent implements OnInit {
  isProcessing = false;
  isComplete = false;

  async ngOnInit(): Promise<void> {
    await this.fetchPlanDetails();
    this.loadMercadoPagoScript();
  }

  constructor(
    private subscriptionService: SubscriptionService,
    private mercadoPagoService: MercadoPagoService,
    private router: Router,
    private transactionService: TransactionService,
    private _toastService: ToastService
  ) { }

  private cardForm: any;
  plan: ISubscription | undefined;

  fetchPlanDetails(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subId = localStorage.getItem('subId');
      if (subId) {
        this.subscriptionService.getById(subId).subscribe(
          (plan: ISubscription) => {
            this.plan = plan;
            resolve();
          },
          (error: any) => {
            reject(error);
          }
        );
      } else {
        console.warn('No subscription ID found in localStorage.');
      }
    });
  }

  subscriptionEnumToString(enumValue: SubscriptionEnum | undefined): string {
    switch (enumValue) {
      case 0:
        return 'Básico';
      case 1:
        return 'Médio';
      case 2:
        return 'Avançado';
      case 3:
        return 'Personalizado';
      default:
        return 'Sem Plano';
    }
  }

  

  loadMercadoPagoScript(): void {
    if (typeof MercadoPago !== 'undefined') {
      this.initializeCardForm();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => this.initializeCardForm();
    document.body.appendChild(script);
  }

  initializeCardForm(): void {
    const mp = new MercadoPago(environment.mercadoPagoPublicKey, {
      locale: 'en-US',
    });

    if (!this.plan) throw new Error('No plan was found');

    this.cardForm = mp.cardForm({
      amount: this.plan.price.toString(),
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Card Number',
        },
        expirationDate: {
          id: 'form-checkout__expirationDate',
          placeholder: 'MM/YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Security Code',
        },
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Cardholder',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Issuing bank',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Installments',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Document type',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Document number',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'Email',
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) console.warn('Form Mounted handling error: ', error);
        },
        onSubmit: (event: Event) => this.processPayment(event),
        onFetching: (resource: any) =>
          console.log('Fetching resource:', resource),
      },
    });
  }

  onSuccess(): void {
    this.router.navigate(['/success']);
  }

  onFail(): void {
    this.router.navigate(['/fail']);
  }

  createMercadoPagoSubscription(
    createMercadoPagoSubscriptionModel: ICreateSubscription
  ): Promise<IPreApprovalResponse> {
    return this.mercadoPagoService
      .createMercadoPagoSubscription(createMercadoPagoSubscriptionModel)
      .toPromise()
      .then((res) => {
        let preApproval = <IPreApprovalResponse>res;
        localStorage.setItem('preApprovalId', preApproval.id);
        this.onSuccess();
        return preApproval;
      })
      .catch((err) => {
        console.error(err.message);
        this.onFail();
        throw err;
      });
  }  

  processPayment(event: Event): void {
    event.preventDefault();
    this.isProcessing = true;
  
    const formData = this.cardForm.getCardFormData();
    if (!formData) {
      console.error('Error retrieving form data.');
      return;
    }
  
    const {
      paymentMethodId: payment_method_id,
      issuerId: issuer_id,
      cardholderEmail: email,
      amount,
      token,
    } = formData;
  
    if (this.plan) {
      const todayDate = new Date();
      const { mercadoPagoPlanId, type, price } = this.plan;
  
      const createSubscription: ICreateSubscription = {
        preapproval_plan_id: mercadoPagoPlanId,
        reason: this.subscriptionEnumToString(type),
        email: email,
        amount: price,
        billing_day: todayDate.getDate(),
        cardTokenId: token,
      };
      this.createMercadoPagoSubscription(createSubscription)
        .then((response) => {
          const transactionId = response.id;
          
          if (transactionId) {
            localStorage.setItem('transactionId', transactionId);
          } else {
            console.error('Transaction ID não encontrado.');
          }
        })
        .catch((error) => {
          console.error('Erro ao processar pagamento:', error);
        });
  
      setTimeout(() => {
        this.isProcessing = false;
        this.isComplete = true;
  
        setTimeout(() => {
          this.isComplete = false;
        }, 2000);
      }, 2000);
      return;
    }
  
    console.error('Erro ao criar subscription no mercado pago');
  }  
}