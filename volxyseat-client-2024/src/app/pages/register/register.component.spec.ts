import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IRegister } from '../../models/SubscriptionModel/IRegister';
import { AuthService } from '../../services/auth/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
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
    mockAuthService.register.and.returnValue(of(mockReponse));

    component.newRegister = {
      name: 'Volxyseat',
      email: 'Volxyseat@gmail.com',
      password: 'password@1123',
    };

    component.register();

      expect(mockAuthService.register).toHaveBeenCalledWith(
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
