import { ISubscription } from './../../models/SubscriptionModel/ISubscription';
import { Component, TemplateRef } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';
import { AuthService } from '../../services/auth/auth.service';

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
    private router: Router
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
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.username = null;
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Erro ao fazer logout:', error);
      },
    });
  }

  getTransaction(): void {
    this.tranService.getById(localStorage.getItem('clientId')).subscribe({
      next: (res) => {
        this.userTransaction = <ITransaction>res;
        this.getSubscriptionById(<string>this.userTransaction?.subscriptionId);
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }

  // getSubscriptionId() {
  //   this.getTransaction()
  //     .pipe(
  //       switchMap((transaction: any) => {
  //         console.log(transaction.subscription);
  //         return this.getSubscriptionById(transaction.subscription);
  //       })
  //     )
  //     .subscribe(
  //       (result: any) => {
  //         this.teste = result.type;
  //         console.log(result);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  // }

  getSubscriptionById(id: string): void {
    this.subService.getById(id).subscribe({
      next: (res: any) => {
        this.userPlan = res;
        this.userPlanType = this.subscriptionEnumToString(
          <SubscriptionEnum>this.userPlan?.type
        );
        console.log(this.userPlan);
      },
    });
  }
}
