import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fail.component.html',
  animations: [
    trigger('scaleIn', [
      state('false', style({ transform: 'scale(0)' })),
      state('true', style({ transform: 'scale(1)' })),
      transition('false => true', animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ]),
    trigger('shake', [
      state('true', style({ transform: 'rotate(0)' })),
      transition('* => true', [
        animate('0.5s', keyframes([
          style({ transform: 'rotate(0)' }),
          style({ transform: 'rotate(5deg)' }),
          style({ transform: 'rotate(-5deg)' }),
          style({ transform: 'rotate(0)' })
        ]))
      ])
    ]),
    trigger('drawPath', [
      state('false', style({ 'stroke-dashoffset': '1' })),
      state('true', style({ 'stroke-dashoffset': '0' })),
      transition('false => true', animate('0.5s'))
    ]),
    trigger('particleAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('{{ delay }}ms 2s', keyframes([
          style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 0.5 }),
          style({
            opacity: 0,
            transform: 'scale(0) translate({{ x }}px, {{ y }}px)',
            offset: 1
          })
        ]))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('alertShake', [
      transition('* => true', [
        animate('0.5s 1.5s', keyframes([
          style({ transform: 'rotate(0)' }),
          style({ transform: 'rotate(10deg)' }),
          style({ transform: 'rotate(-10deg)' }),
          style({ transform: 'rotate(0)' })
        ]))
      ])
    ])
  ]
})
export class FailComponent implements OnInit {
  isVisible = false;
  showParticles = false;
  particles = Array(20).fill(0).map(() => ({
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100
  }));

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      setTimeout(() => {
        this.showParticles = true;
      }, 1000);
    });
  }
}