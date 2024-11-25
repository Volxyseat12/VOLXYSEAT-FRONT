import { AuthService } from './../../services/auth/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { MercadoPagoService } from './../../services/mercado-pago.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { CommonModule } from '@angular/common';
import { ToastService } from 'angular-toastify';
import { TransactionService } from '../../services/transaction.service';
import { catchError, forkJoin, of } from 'rxjs';
import { ITransactionResponse } from '../../models/SubscriptionModel/ITransactionResponse';
import { CancelComponent } from '../../components/cancel/cancel.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, DashboardComponent],
})
export class ProfileComponent implements OnInit {
  subscription: ISubscription | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  username: string | null = null;
  email: string | null = null;
  showDropdown: boolean = false;
  isAuthenticated: boolean = false;
  userTransaction: ITransactionResponse | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private mercadoPagoService: MercadoPagoService,
    private transactionService: TransactionService,
    private _toastService: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkUserLogin();
    this.getTransaction();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  subscriptionEnumToString(enumValue: SubscriptionEnum): string {
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getSubscriptionType(type: string) {
    return (
      SubscriptionEnum[type as keyof typeof SubscriptionEnum] || 'Desconhecido'
    );
  }

  private checkUserLogin() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.isAuthenticated = !!this.username;
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
          this._toastService.warn('Você ainda não tem um plano para exibirmos!');
          this.subscription = null;
          this.isLoading = false;
        },
      });
  }

  private loadSubscriptionFromStorage() {
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

  cancelSubscriptionAndDisableTransaction() {
    const userMercadoPagoSubscriptionId =
      this.userTransaction?.mercadoPagoSubscriptionId;
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
          this.getTransaction();
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

  cancelConfirm() {
    this.dialog.open(CancelComponent, {
    });
  }
}