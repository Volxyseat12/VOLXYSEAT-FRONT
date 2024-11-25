import { AuthService } from './../../services/auth/auth.service';
import { ISubscription } from './../../models/SubscriptionModel/ISubscription';
import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username: string | null = null;
  isAuthenticated: boolean = false;
  isMenuOpen = false;
  isWideScreen = window.innerWidth > 930;
  teste: string = '';
  showDropdown: boolean = false;
  userPlanType: string | null = null;
  userPlan: ISubscription | null = null;
  userTransaction: ITransaction | null = null;

  constructor(
    private authService: AuthService,
    private tranService: TransactionService,
    private subService: SubscriptionService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.checkUserLogin();
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

  checkUserLogin() {
    this.getTransaction();
    const token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!token;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    localStorage.clear();
    this.username = null;
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  getTransaction(): void {
    this.tranService.getById(localStorage.getItem('clientId')).subscribe({
      next: (res) => {
        this.userTransaction = <ITransaction>res;
        this.getSubscriptionById(<string>this.userTransaction?.subscriptionId);
      },
      error: (error: any) => {
      },
    });
  }

  getSubscriptionById(id: string): void {
    this.subService.getById(id).subscribe({
      next: (res: any) => {
        this.userPlan = res;
        if (this.userPlan)
          this.userPlanType = this.subscriptionEnumToString(
            <SubscriptionEnum>this.userPlan?.type
          );
        else this.userPlanType = 'Sem Plano';
      },
    });
  }
}
