import { SubscriptionEnum } from '../Enums/SubscriptionEnum';
import { SubscriptionStatus } from '../Enums/SubscriptionStatus';
import { ISubscriptionProperties } from '../ISubscriptionProperties';


export interface ISubscription {
  id: string;
  type: SubscriptionEnum;
  status: SubscriptionStatus;
  description: string;
  price: number;
  mercadoPagoPlanId: string;
  createdOn: Date;
  updatedOn: Date;
  subscriptionProperties: ISubscriptionProperties;
}