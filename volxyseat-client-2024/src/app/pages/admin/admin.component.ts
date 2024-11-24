import { ISubscriptionProperties } from './../../models/ISubscriptionProperties';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionStatus } from '../../models/Enums/SubscriptionStatus';
import { SubscriptionRequest } from '../../models/SubscriptionModel/SubscriptionRequest';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule
]
})
export class AdminComponent implements OnInit{
  SubscriptionEnum = SubscriptionEnum;
  username: string | null = null;
  isAuthenticated: boolean = false;
  showDropdown: boolean = false;
  showTypeDropdown: boolean = false;
  showStatusDropdown = false;
  selectedType: SubscriptionEnum = SubscriptionEnum.Basic;
  selectedStatus: SubscriptionStatus = SubscriptionStatus.Active;


  constructor(private authService: AuthService, private router: Router, private subscriptionService: SubscriptionService, private _toastService: ToastService) {
    this.checkUserLogin();
    this.getSubscriptions();
  }

  ngOnInit(){
    this.getSubscriptions();
  }

  subscriptionForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    price: new FormControl(0,Validators.required),
    mercadoPagoPlanId: new FormControl(''),
    subscriptionProperties: new FormControl({}, Validators.required),
    type: new FormControl(0, Validators.required),
    status: new FormControl(SubscriptionStatus.Inactive, Validators.required)
  })

  subscriptions?: ISubscription[];
  subscription: ISubscription = {
    id: '',
    description: '',
    price: 0,
    status: SubscriptionStatus.Inactive,
    type: SubscriptionEnum.Basic,
    subscriptionProperties: {
      analytics: false,
      apiAccess: false,
      backup: false,
      chat: false,
      cloudStorage: false,
      customization: false,
      documentation: false,
      email: false,
      integration: false,
      liveSupport: false,
      messenger: false,
      multiUser: false,
      onboarding: false,
      phone: false,
      prioritySupport: false,
      serviceLevel: false,
      sla: false,
      support: false,
      training: false,
      updates: false,
    },
    mercadoPagoPlanId: '',
    createdOn: Date.prototype,
    updatedOn: Date.prototype,
  };
  subscriptionRequest: SubscriptionRequest = {
    description: '',
    mercadoPagoPlanId: '',
    price: 0,
    status: SubscriptionStatus.Inactive,
    type: SubscriptionEnum.Basic,
    subscriptionProperties: {
      analytics: false,
      apiAccess: false,
      backup: false,
      chat: false,
      cloudStorage: false,
      customization: false,
      documentation: false,
      email: false,
      integration: false,
      liveSupport: false,
      messenger: false,
      multiUser: false,
      onboarding: false,
      phone: false,
      prioritySupport: false,
      serviceLevel: false,
      sla: false,
      support: false,
      training: false,
      updates: false,
    }
  };

  getSubscriptions(){
    this.subscriptionService.getAll()
      .subscribe({
        next : (data) => {
        this.subscriptions = data;
        console.log(data);
        this.subscription = this.subscriptions[0];
      },
      error : (error) => {
        console.error('Erro ao obter assinaturas:', error);
      }
    })
  }

  subscriptionTypes = [
    SubscriptionEnum.Basic,
    SubscriptionEnum.Medium,
    SubscriptionEnum.Advanced,
    SubscriptionEnum.Personalized
  ];

  subscriptionStatus =  [
    SubscriptionStatus.Active,
    SubscriptionStatus.Inactive
  ];

  subscriptionNumberToEnum(number: number): SubscriptionEnum{
    switch (number) {
      case 0:
        return SubscriptionEnum.Basic;
      case 1:
        return SubscriptionEnum.Medium;
      case 2:
        return SubscriptionEnum.Advanced;
      case 3:
        return SubscriptionEnum.Personalized;
      default:
        return SubscriptionEnum.Personalized;
    }
  }

  subscriptionEnumToString(enumValue: SubscriptionEnum): string {
    switch (enumValue) {
      case SubscriptionEnum.Basic:
        return 'Básico';
      case SubscriptionEnum.Medium:
        return 'Médio';
      case SubscriptionEnum.Advanced:
        return 'Avançado';
      case SubscriptionEnum.Personalized:
        return 'Personalizado';
      default:
        return 'Sem plano';
    }
  }

  subscriptionStatusToString(status: SubscriptionStatus): string {
    return SubscriptionStatus[status];
  }

  checkUserLogin() {
    const token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!token;
  }

  toggleUserDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.showTypeDropdown = false;
  }

  toggleTypeDropdown(): void {
    this.showTypeDropdown = !this.showTypeDropdown;
    this.showDropdown = false;
  }

  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  selectType(type: SubscriptionEnum): void {
    this.selectedType = type;
    this.subscription.type = type;
    this.showTypeDropdown = false;
  }

  selectStatus(status: SubscriptionStatus) {
    this.selectedStatus = status;
    this.subscription.status = status;
    this.showStatusDropdown = false;
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.clear();
        this.username = null;
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Erro ao fazer logout:', error);
      }
    );
  }

  updateSubscription(id: string) {
      this.subscriptionService.updateSubscription(id, this.subscription)
        .subscribe({
          next: (response) => {
            this._toastService.success('Plano atualizado com sucesso!')
          },
          error: (error) => {
            this._toastService.error('Erro ao atualizar Plano!')
            console.error('Erro ao atualizar plano:', error);
          }
        });
  }

  updateForm(id: string){
    this.subscriptionService.getById(id).subscribe({
      next: (data: ISubscription) => {
        this.subscription = data;
        console.log(this.subscription);
        this.subscriptionForm.patchValue({
          ...this.subscription,
        })
        this.selectType(this.subscription.type)
        this.selectStatus(this.subscription.status)
      },
      error: () => {
        this._toastService.error("Erro ao buscar plano")
      }
    })
  }
}
