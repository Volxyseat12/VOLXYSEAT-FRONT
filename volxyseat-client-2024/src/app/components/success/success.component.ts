import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';
import { TransactionService } from '../../services/transaction.service';
import { ICreateTransactionResponse } from '../../models/ICreateTransactionResponse';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  templateUrl: './success.component.html',
  imports: [CommonModule],
  template: `
  `,
  animations: [
    trigger('scaleIn', [
      state('false', style({ transform: 'scale(0)' })),
      state('true', style({ transform: 'scale(1)' })),
      transition(
        'false => true',
        animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ),
    ]),
    trigger('pulse', [
      state('true', style({ transform: 'scale(1)' })),
      transition('* => true', [
        animate(
          '2s infinite',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.1)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('drawPath', [
      state('false', style({ 'stroke-dashoffset': '1' })),
      state('true', style({ 'stroke-dashoffset': '0' })),
      transition('false => true', animate('0.5s')),
    ]),
    trigger('particleAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate(
          '2s {{ delay }}ms infinite',
          keyframes([
            style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 0.5 }),
            style({
              opacity: 0,
              transform: 'scale(0) translate({{ x }}px, {{ y }}px)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('sparkleRotate', [
      transition('* => true', [
        animate(
          '0.5s 1.5s',
          keyframes([
            style({ transform: 'rotate(0)' }),
            style({ transform: 'rotate(10deg)' }),
            style({ transform: 'rotate(-10deg)' }),
            style({ transform: 'rotate(0)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SuccessComponent implements OnInit {
  constructor(private transactionService: TransactionService, private _toastService: ToastService) {
    this.createTransaction();
  }

  createTransaction() {
    const subId = localStorage.getItem('subId');
    const clientId = localStorage.getItem('clientId');
    const preApprovalId = localStorage.getItem('preApprovalId');
    if (subId && clientId && preApprovalId) {
      const transaction: ITransaction = {
        clientId: clientId,
        subscriptionId: subId,
        mercadoPagoSubscriptionId: preApprovalId,
      };
  
      this.transactionService.post(transaction).subscribe({
        next: (res: ICreateTransactionResponse) => {
          localStorage.setItem('transactionId', res.transactionId);
        },
        error: (err) => {
          this._toastService.error('Erro ao criar transação.');
        },
      });
    }
  }

  isVisible = false;
  showConfetti = false;
  particles = Array(20)
    .fill(0)
    .map(() => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    }));

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      setTimeout(() => {
        this.showConfetti = true;
      }, 1000);
    });
  }
}
