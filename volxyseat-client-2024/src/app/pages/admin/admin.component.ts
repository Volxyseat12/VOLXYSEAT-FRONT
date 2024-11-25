import { SubscriptionEnum } from './../../models/Enums/SubscriptionEnum';
import { ISubscriptionRequest } from './../../models/SubscriptionModel/ISubscriptionRequest';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionStatus } from '../../models/Enums/SubscriptionStatus';
import { SubscriptionService } from '../../services/subscription.service';
import { ToastService } from 'angular-toastify';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { ISubscriptionProperties, PropertyCategoryMapping } from '../../models/ISubscriptionProperties';

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
    ReactiveFormsModule,
    MatIconModule,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ]
})
export class AdminComponent implements OnInit {
  SubscriptionStatus = SubscriptionStatus;
  SubscriptionEnum = SubscriptionEnum;
  selectedCategory: string = 'Suporte';
  isTransitioning: boolean = false;

  subscriptions?: ISubscription[];
  subscriptionProperties: ISubscriptionProperties = {
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
  };
  subscriptionPropertiesRequest: ISubscriptionProperties = {
    support: false,
    phone: false,
    email: false,
    messenger: false,
    chat: false,
    liveSupport: false,
    documentation: false,
    onboarding: false,
    training: false,
    updates: false,
    backup: false,
    customization: false,
    analytics: false,
    integration: false,
    apiAccess: false,
    cloudStorage: false,
    multiUser: false,
    prioritySupport: false,
    sla: false,
    serviceLevel: false,
  };
  selectedSubscription: ISubscription = {
    id: '',
    description: '',
    price: 0,
    status: SubscriptionStatus.Inactive,
    type: SubscriptionEnum.Basic,
    subscriptionProperties: this.subscriptionProperties,
    mercadoPagoPlanId: '',
    createdOn: Date.prototype,
    updatedOn: Date.prototype,
  };
  subscriptionRequest: ISubscriptionRequest = {
    typeId: 0,
    statusId: 0,
    description: '',
    price: 0,
    subscriptionProperties: this.subscriptionProperties,
    mercadoPagoPlanId: '',
  }

  constructor(private subscriptionService: SubscriptionService, private _toastService: ToastService) {

  }

  ngOnInit(): void {
    this.getSubscriptions();
    if (this.selectedSubscription.id) {
      this.updateForm(this.selectedSubscription.id);
    }
  }

  subscriptionForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    mercadoPagoPlanId: new FormControl(''),
    type: new FormControl(0, Validators.required),
    status: new FormControl(SubscriptionStatus.Inactive, Validators.required),
    subscriptionProperties: new FormControl({}, Validators.required)
  });

  subscriptionPropertiesForm = new FormGroup({
    support: new FormControl(false, Validators.required),
    phone: new FormControl(false, Validators.required),
    email: new FormControl(false, Validators.required),
    messenger: new FormControl(false, Validators.required),
    chat: new FormControl(false, Validators.required),
    liveSupport: new FormControl(false, Validators.required),
    documentation: new FormControl(false, Validators.required),
    onboarding: new FormControl(false, Validators.required),
    training: new FormControl(false, Validators.required),
    updates: new FormControl(false, Validators.required),
    backup: new FormControl(false, Validators.required),
    customization: new FormControl(false, Validators.required),
    analytics: new FormControl(false, Validators.required),
    integration: new FormControl(false, Validators.required),
    apiAccess: new FormControl(false, Validators.required),
    cloudStorage: new FormControl(false, Validators.required),
    multiUser: new FormControl(false, Validators.required),
    prioritySupport: new FormControl(false, Validators.required),
    sla: new FormControl(false, Validators.required),
    serviceLevel: new FormControl(false, Validators.required)
  });

  getSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
        console.log(data);
      },
      error: () => {
        this._toastService.error('Erro ao buscar planos');
      }
    });
  };

  updateForm(id: string) {
    this.subscriptionService.getById(id).subscribe({
      next: (data: ISubscription) => {
        this.selectedSubscription = data;
        console.log(this.selectedSubscription);
        this.subscriptionForm.patchValue({
          ...this.selectedSubscription,
        });

        this.subscriptionPropertiesForm.patchValue({
          ...this.selectedSubscription.subscriptionProperties,
        });
      },
      error: () => {
        this._toastService.error("Erro ao buscar plano");
      }
    })
  }

  subscriptionTypes = [
    SubscriptionEnum.Basic,
    SubscriptionEnum.Medium,
    SubscriptionEnum.Advanced,
    SubscriptionEnum.Personalized
  ];

  subscriptionStatus = [
    SubscriptionStatus.Active,
    SubscriptionStatus.Inactive
  ];

  subscriptionNumberToEnum(number: number): SubscriptionEnum {
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

  saveEditedSubscription(id: string) {
    this.subscriptionRequest.description = this.subscriptionForm.get('description')?.value ?? '';
    this.subscriptionRequest.price = this.subscriptionForm.get('price')?.value ?? 0;
    this.subscriptionRequest.mercadoPagoPlanId = this.subscriptionForm.get('mercadoPagoPlanId')?.value ?? '';
    this.subscriptionRequest.typeId = this.subscriptionForm.get('type')?.value ?? SubscriptionEnum.Basic;
    this.subscriptionRequest.statusId = this.subscriptionForm.get('status')?.value ?? SubscriptionStatus.Inactive;
    const subscriptionProperties: ISubscriptionProperties = {
      support: this.subscriptionPropertiesForm.get('support')?.value ?? false,
      phone: this.subscriptionPropertiesForm.get('phone')?.value ?? false,
      email: this.subscriptionPropertiesForm.get('email')?.value ?? false,
      messenger: this.subscriptionPropertiesForm.get('messenger')?.value ?? false,
      chat: this.subscriptionPropertiesForm.get('chat')?.value ?? false,
      liveSupport: this.subscriptionPropertiesForm.get('liveSupport')?.value ?? false,
      documentation: this.subscriptionPropertiesForm.get('documentation')?.value ?? false,
      onboarding: this.subscriptionPropertiesForm.get('onboarding')?.value ?? false,
      training: this.subscriptionPropertiesForm.get('training')?.value ?? false,
      updates: this.subscriptionPropertiesForm.get('updates')?.value ?? false,
      backup: this.subscriptionPropertiesForm.get('backup')?.value ?? false,
      customization: this.subscriptionPropertiesForm.get('customization')?.value ?? false,
      analytics: this.subscriptionPropertiesForm.get('analytics')?.value ?? false,
      integration: this.subscriptionPropertiesForm.get('integration')?.value ?? false,
      apiAccess: this.subscriptionPropertiesForm.get('apiAccess')?.value ?? false,
      cloudStorage: this.subscriptionPropertiesForm.get('cloudStorage')?.value ?? false,
      multiUser: this.subscriptionPropertiesForm.get('multiUser')?.value ?? false,
      prioritySupport: this.subscriptionPropertiesForm.get('prioritySupport')?.value ?? false,
      sla: this.subscriptionPropertiesForm.get('sla')?.value ?? false,
      serviceLevel: this.subscriptionPropertiesForm.get('serviceLevel')?.value ?? false,
    };
    this.subscriptionRequest.subscriptionProperties = subscriptionProperties;

    this.subscriptionService.updateSubscription(id, this.subscriptionRequest).subscribe({
      next: () => {
        this.selectedSubscription.subscriptionProperties = { ...subscriptionProperties };
        this.getSubscriptions();
        this._toastService.success('Plano atualizado com sucesso');
      },
      error: () => {
        this._toastService.error('Erro ao atualizar plano');
      }
    });
  }

  setSelectedCategory(category: string): void {
    this.isTransitioning = true;
    setTimeout(() => {
      this.selectedCategory = category;
      this.isTransitioning = false;
    }, 300);
  }

  categories = [
    { name: 'Suporte' },
    { name: 'Documentação' },
    { name: 'Funcionalidades' },
    { name: 'Suporte Prioritário' },
  ];

  getPropertiesForCategory() {
    return this.propertyCategoryMapping[this.selectedCategory] || [];
  }

  onSubscriptionPropertyChange(key: keyof ISubscriptionProperties, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.selectedSubscription.subscriptionProperties) {
      this.selectedSubscription.subscriptionProperties = {
        ...this.selectedSubscription.subscriptionProperties,
        [key]: input.checked,
      };
    }
  }

  propertyCategoryMapping: PropertyCategoryMapping = {
    'Suporte': [
      { key: 'support', name: 'Suporte' },
      { key: 'phone', name: 'Telefone' },
      { key: 'email', name: 'E-mail' },
      { key: 'messenger', name: 'Messenger' },
      { key: 'chat', name: 'Chat' }
    ],
    'Documentação': [
      { key: 'documentation', name: 'Documentação' },
      { key: 'onboarding', name: 'Onboarding' },
      { key: 'training', name: 'Treinamento' },
      { key: 'updates', name: 'Atualizações' },
    ],
    'Funcionalidades': [
      { key: 'backup', name: 'Backup' },
      { key: 'customization', name: 'Customização' },
      { key: 'analytics', name: 'Analytics' },
      { key: 'integration', name: 'Integração' },
      { key: 'apiAccess', name: 'Acesso à API' },
      { key: 'cloudStorage', name: 'Armazenamento em Nuvem' },
      { key: 'multiUser', name: 'Múltiplos Usuários' },
    ],
    'Suporte Prioritário': [
      { key: 'prioritySupport', name: 'Suporte Prioritário' },
      { key: 'sla', name: 'SLA' },
      { key: 'serviceLevel', name: 'Nível de Serviço' }
    ]
  };
}
