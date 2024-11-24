import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from '../../services/subscription.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { PropertyCategoryMapping } from '../../models/ISubscriptionProperties';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  private _subscription: Subject<void> = new Subject<void>();
  subscriptions: ISubscription[] = [];
  selectedCategory: string = 'Suporte';
  subscriptionProperties: { [key: string]: boolean } = {};
  isTransitioning: boolean = false;
  hoveredCard: number | null = null; // For hover control

  categories = [
    { name: 'Suporte' },
    { name: 'Documentação' },
    { name: 'Funcionalidades' },
    { name: 'Suporte Prioritário' },
  ];

  features = [
    { title: 'Recursos Premium', description: 'Acesso a todos os recursos avançados da plataforma' },
    { title: 'Segurança Garantida', description: 'Proteção total dos seus dados e informações' },
    { title: 'Alta Performance', description: 'Velocidade e eficiência em todas as operações' },
    { title: 'Suporte 24/7', description: 'Assistência técnica sempre disponível!' },
  ];

  propertyCategoryMapping: PropertyCategoryMapping = {
    Suporte: [
      { name: 'Central de autoatendimento', key: 'support' },
      { name: 'Telefone', key: 'phone' },
      { name: 'Email', key: 'email' },
      { name: 'Messenger', key: 'messenger' },
      { name: 'Chat', key: 'chat' },
      { name: 'Suporte ao vivo', key: 'liveSupport' },
    ],
    Documentação: [
      { name: 'Documentação', key: 'documentation' },
      { name: 'Onboarding', key: 'onboarding' },
      { name: 'Treinamento', key: 'training' },
    ],
    Funcionalidades: [
      { name: 'Atualizações', key: 'updates' },
      { name: 'Backup', key: 'backup' },
      { name: 'Personalização', key: 'customization' },
      { name: 'Análises', key: 'analytics' },
      { name: 'Integração', key: 'integration' },
      { name: 'Acesso à API', key: 'apiAccess' },
      { name: 'Armazenamento em nuvem', key: 'cloudStorage' },
      { name: 'Multiusuário', key: 'multiUser' },
    ],
    'Suporte Prioritário': [
      { name: 'Suporte prioritário', key: 'prioritySupport' },
      { name: 'SLA', key: 'sla' },
      { name: 'Nível de serviço', key: 'serviceLevel' },
    ],
  };

  subscriptionEnumToString(enumValue: number): string {
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
        return 'Unknown';
    }
  }

  constructor(private _service: SubscriptionService, private router: Router) {}

  ngOnInit(): void {
    this._service
      .getAll()
      .pipe(takeUntil(this._subscription))
      .subscribe((response: ISubscription[]) => {
        this.subscriptions = response;
        console.log(this.subscriptions);
        this.setSubscriptionProperties(this.subscriptions[0]);
      });
  }

  setSelectedCategory(category: string): void {
    this.isTransitioning = true;
    setTimeout(() => {
      this.selectedCategory = category;
      this.isTransitioning = false;
    }, 300);
  }

  selectSubscription(subscriptionId: string) {
    localStorage.setItem('subId', subscriptionId);
    const token = localStorage.getItem('token');
    if (token) this.router.navigate(['/payment']);
    else this.router.navigate(['/login']);
  }

  setSubscriptionProperties(subscription: ISubscription): void {
    this.subscriptionProperties = {
      support: subscription.subscriptionProperties.support,
      phone: subscription.subscriptionProperties.phone,
      email: subscription.subscriptionProperties.email,
      messenger: subscription.subscriptionProperties.messenger,
      chat: subscription.subscriptionProperties.chat,
      liveSupport: subscription.subscriptionProperties.liveSupport,
      documentation: subscription.subscriptionProperties.documentation,
      onboarding: subscription.subscriptionProperties.onboarding,
      training: subscription.subscriptionProperties.training,
      updates: subscription.subscriptionProperties.updates,
      backup: subscription.subscriptionProperties.backup,
      customization: subscription.subscriptionProperties.customization,
      analytics: subscription.subscriptionProperties.analytics,
      integration: subscription.subscriptionProperties.integration,
      apiAccess: subscription.subscriptionProperties.apiAccess,
      cloudStorage: subscription.subscriptionProperties.cloudStorage,
      multiUser: subscription.subscriptionProperties.multiUser,
      prioritySupport: subscription.subscriptionProperties.prioritySupport,
      sla: subscription.subscriptionProperties.sla,
      serviceLevel: subscription.subscriptionProperties.serviceLevel,
    };
  }

  getPropertiesForCategory() {
    return this.propertyCategoryMapping[this.selectedCategory] || [];
  }

  ngOnDestroy(): void {
    this._subscription.next();
    this._subscription.complete();
  }

  setHoveredCard(index: number | null) {
    this.hoveredCard = index;
  }
}
