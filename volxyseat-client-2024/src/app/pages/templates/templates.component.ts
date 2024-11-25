import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

interface Template {
  id: number;
  name: string;
  description: string;
  previewImage: string;
  features: string[];
  category: string;
}

@Component({
  selector: 'app-template-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class TemplatesComponent {
  selectedTemplate = new FormControl<number | null>(null);

  templates: Template[] = [
    {
      id: 1,
      name: 'Negócio Profissional',
      description: 'Projeto para empresas e negócios',
      previewImage: '../public/professional.jpg',
      category: 'Negócios',
      features: [
        'Integração com Google Maps',
        'Formulário de contato',
        'Layout responsivo',
        'SEO otimizado'
      ]
    },
    {
      id: 2,
      name: 'E-commerce',
      description: 'Ideal para lojas e comércios eletrônicos',
      previewImage: '../public/ecommerce.png',
      category: 'E-commerce',
      features: [
        'Catálogo de produtos',
        'Carrinho de compras',
        'Pagamento online',
        'Integração com redes sociais'
      ]
    },
    {
      id: 3,
      name: 'Portfolio',
      description: 'Mostre seus projetos e habilidades',
      previewImage: '../public/port.jpg',
      category: 'Portifolio',
      features: [
        'Galeria de imagens',
        'Depoimentos de clientes',
        'Formulário de contato',
        'Layout responsivo'
      ]
    }
  ];

  constructor(private router: Router) {}

  selectTemplate(templateId: number) {
    this.selectedTemplate.setValue(templateId);
  }

  proceed() {
    if (this.selectedTemplate.value) {
      this.router.navigate(['/profile'], {
        queryParams: { templateId: this.selectedTemplate.value }
      });
    }
  }
}