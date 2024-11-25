import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <div class="content">
        <h1>404</h1>
        <h2>Página não encontrada!</h2>
        <p>A página que você está procurando não existe ou foi removida.</p>
        <button class="bg-orange-500 font-bold uppercase text-white" (click)="goHome()">Voltar para a página principal</button>
      </div>
    </div>

    <style>
      .not-found-container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: Arial, sans-serif;
        background-color: #f8f9fa;
      }

      .content {
        padding: 2rem;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        font-size: 6rem;
        margin: 0;
        color: #dc3545;
      }

      h2 {
        font-size: 2rem;
        margin: 1rem 0;
        color: #343a40;
      }

      p {
        color: #6c757d;
        margin-bottom: 2rem;
      }

      button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
      }
    </style>
  `,
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
