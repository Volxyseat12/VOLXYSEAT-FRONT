import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionComponent } from './subscription.component';
import { SubscriptionService } from '../../services/subscription.service';

describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent;
  let fixture: ComponentFixture<SubscriptionComponent>;
  let mockSubscriptionService: jasmine.SpyObj<SubscriptionService>;

  beforeEach(async () => {
    mockSubscriptionService = jasmine.createSpyObj('SubscriptionService', [
      'getSubscriptions',
    ]);
    await TestBed.configureTestingModule({
      imports: [SubscriptionComponent],
      providers: [
        { provide: SubscriptionService, useValue: mockSubscriptionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
