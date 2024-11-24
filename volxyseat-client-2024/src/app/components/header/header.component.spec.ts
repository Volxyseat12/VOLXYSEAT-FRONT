import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LogOutService } from '../../services/log-out.service';
import { SubscriptionService } from '../../services/subscription.service';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockLogOutService: jasmine.SpyObj<LogOutService>;
  let mockSubscriptionService: jasmine.SpyObj<SubscriptionService>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockLogOutService = jasmine.createSpyObj('LogOutService', ['logout']);
    mockSubscriptionService = jasmine.createSpyObj('SubscriptionService', [
      'getById',
    ]);
    mockTransactionService = jasmine.createSpyObj('TransactionService', [
      'getById',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: LogOutService, useValue: mockLogOutService },
        { provide: SubscriptionService, useValue: mockSubscriptionService },
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize username and authentication status', () => {
    localStorage.setItem('token', 'dummyToken');
    localStorage.setItem('username', 'testUser');

    component.checkUserLogin();

    expect(component.username).toBe('testUser');
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should call logout and clear local storage', () => {
    mockLogOutService.logout.and.returnValue(of({})); // Simulate successful logout

    component.logout();

    expect(mockLogOutService.logout).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(component.isAuthenticated).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should toggle dropdown visibility', () => {
    component.toggleDropdown();
    expect(component.showDropdown).toBeTrue();

    component.toggleDropdown();
    expect(component.showDropdown).toBeFalse();
  });

  it('should call getTransaction and handle response', () => {
    const transactionId = '123';
    localStorage.setItem('transactionId', transactionId);
    const mockTransactionResponse = { subscription: 'subscriptionId' };
    mockTransactionService.getById.and.returnValue(of(mockTransactionResponse));

    component.getTransaction().subscribe((transaction) => {
      expect(transaction).toEqual(mockTransactionResponse);
    });

    expect(mockTransactionService.getById).toHaveBeenCalledWith(transactionId);
  });

  it('should get subscription by ID', () => {
    const subscriptionId = 'subscriptionId';
    const mockSubscriptionResponse = { type: 'Premium' };
    mockSubscriptionService.getById.and.returnValue(
      of(mockSubscriptionResponse)
    );

    component.getSubscriptionById(subscriptionId).subscribe((subscription) => {
      expect(subscription).toEqual(mockSubscriptionResponse);
    });

    expect(mockSubscriptionService.getById).toHaveBeenCalledWith(
      subscriptionId
    );
  });
});
