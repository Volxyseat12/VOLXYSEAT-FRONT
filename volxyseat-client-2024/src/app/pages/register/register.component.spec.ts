import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IRegister } from '../../models/SubscriptionModel/IRegister';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRegisterService: jasmine.SpyObj<RegisterService>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRegisterService = jasmine.createSpyObj('RegisterService', ['post']);
    mockLoginService = jasmine.createSpyObj('LoginService', ['']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: mockRegisterService },
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerService.post and navigate on successful registration', () => {
    const mockReponse = { success: true };
    mockRegisterService.post.and.returnValue(of(mockReponse));

    component.newRegister = {
      name: 'Volxyseat',
      email: 'Volxyseat@gmail.com',
      password: 'password@1123',
    };

    component.registerAndLogin();

      expect(mockRegisterService.post).toHaveBeenCalledWith(
        jasmine.objectContaining({
          name: 'Volxyseat',
          email: 'Volxyseat@gmail.com',
          password: 'password@1123',
        })
      );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.newRegister).toEqual(new IRegister());
  });
});
