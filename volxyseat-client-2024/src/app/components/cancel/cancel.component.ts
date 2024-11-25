import { Component, EventEmitter, Output } from '@angular/core';
import { ITransactionResponse } from '../../models/SubscriptionModel/ITransactionResponse';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { SubscriptionService } from '../../services/subscription.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { TransactionService } from '../../services/transaction.service';
import { ToastService } from 'angular-toastify';
import { catchError, forkJoin, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './cancel.component.html',
})
export class CancelComponent {
  subscription: ISubscription | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  username: string | null = null;
  email: string | null = null;
  showDropdown: boolean = false;
  isAuthenticated: boolean = false;
  userTransaction: ITransactionResponse | null = null;

  constructor(
    private mercadoPagoService: MercadoPagoService,
    private transactionService: TransactionService,
    private _toastService: ToastService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) { }

  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.getTransaction();
  }

  cancelSubscriptionAndDisableTransaction() {
    const userMercadoPagoSubscriptionId = this.userTransaction?.mercadoPagoSubscriptionId;
    if (userMercadoPagoSubscriptionId) {
      const userId: string | null = localStorage.getItem('clientId');
      if (!userId) {
        this._toastService.error('Usuário não logado.');
        return;
      }
  
      if (!this.userTransaction) {
        this._toastService.error('Transação do usuário não encontrada.');
        return;
      }
  
      const cancelsubscription$ = this.mercadoPagoService
        .cancelMercadoPagoSubscription(userMercadoPagoSubscriptionId)
        .pipe(catchError((err) => of(`Erro no cancelamento: ${err.message}`)));
  
      const disableTransaction$ = this.transactionService
        .disableTransaction(userId)
        .pipe(catchError((err) => of(`Erro na desativação: ${err.message}`)));
  
      forkJoin([cancelsubscription$, disableTransaction$]).subscribe({
        next: ([cancelRes, disableRes]) => {
          this._toastService.success('Plano cancelado com sucesso.');
          this.router.navigate([this.router.url]).then(() => {
            window.location.reload();  // Recarrega a página para refletir as mudanças
          });
        },
        error: (err) => {
          console.error('Erro ao processar:', err);
          this._toastService.error('Erro ao cancelar plano.');
        },
      });
  
    } else {
      this._toastService.error('Nenhum plano adquirido.');
    }
  }  
  

  getTransaction(): void {
    this.transactionService
      .getById(localStorage.getItem('clientId'))
      .subscribe({
        next: (res) => {
          this.userTransaction = <ITransactionResponse>res;

          this.loadSubscriptionFromStorage();
        },
        error: (error: any) => {
          console.log(error.message);
          this.subscription = null;
          this.isLoading = false;
        },
      });
  }

  private loadSubscriptionFromStorage() {
    console.log(this.userTransaction?.isActive);
    if (!this.userTransaction?.isActive) {
      this.subscription = null;
      this.isLoading = false;
      return;
    }
    const subId = localStorage.getItem('subId');

    if (subId) {
      this.loadSubscription(subId);
    } else {
      this.isLoading = false;
    }
  }

  private loadSubscription(id: string) {
    this.subscriptionService.getById(id).subscribe({
      next: (subscription: ISubscription) => {
        this.subscription = subscription;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log('estou aqui');
        if (err && err.message) {
          this.error = err.message;
        } else {
          this.error = 'Nenhum plano adquirido ainda';
        }
        this.subscription = null;
        this.isLoading = false;
      },
    });
  }

  back() {
    this.close.emit();
  }
}
