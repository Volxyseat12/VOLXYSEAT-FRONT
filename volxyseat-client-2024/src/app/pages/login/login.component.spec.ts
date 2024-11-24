import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';

import { TransactionService } from '../../services/transaction.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['post']);
    transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'getById',
    ]);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: TransactionService, useValue: transactionServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate', () => {
    const mockResponse = {
      jwt: 'FMcmvPd6sy4MKLijhIIVLRcM8w2fe341s7iZgaydSmO61SVfwcHHEhWb08MwV1Tg',
      clientId: '4d773837-9103-4dc6-858e-70941e99d3d0',
      email: 'pedro@gmail.com',
      name: 'Pedro',
    };
    const mockTransaction = { id: 'fb930ba2-d07f-462e-9800-e50943da3a12' };

    loginServiceSpy.post.and.returnValue(of(mockResponse));
    transactionServiceSpy.getById.and.returnValue(of(mockTransaction));

    component.loginRequest = { userName: 'Pedro', password: 'Senha@123' };

    component.login();

    expect(loginServiceSpy.post).toHaveBeenCalledWith(component.loginRequest);
    expect(transactionServiceSpy.getById).toHaveBeenCalledWith(
      '4d773837-9103-4dc6-858e-70941e99d3d0'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
