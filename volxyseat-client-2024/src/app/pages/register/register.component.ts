import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from '../../models/SubscriptionModel/IRegister';
import { ToastService } from 'angular-toastify';
import { AuthService } from '../../services/auth/auth.service';
import { BlobService } from '../../services/blob.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  userId!: string;
  registerForm: FormGroup;
  blobUrl: string = '';

  ngOnInit(): void {
    this.blobUrl = this.blobService.getBlobUrl();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private _toastService: ToastService,
    private fb: FormBuilder,
    private blobService: BlobService
  ) {
    this.registerForm = this.fb.group({
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const newRegister: IRegister = {
        name: this.registerForm.get('companyName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };
      this.authService.register(newRegister).subscribe({
        next: (response: any) => {
          this.registerForm.reset();
          this._toastService.success('Registrado com Sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this._toastService.error('Falha no Cadastro!');
        },
      });
    }
  }
}
