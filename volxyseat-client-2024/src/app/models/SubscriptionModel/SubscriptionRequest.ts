import { SubscriptionEnum } from "../Enums/SubscriptionEnum";
import { SubscriptionStatus } from "../Enums/SubscriptionStatus";
import { ISubscriptionProperties } from "../ISubscriptionProperties";

export interface SubscriptionRequest {
  type: SubscriptionEnum;
  status: SubscriptionStatus;
  description: string;
  price: number;
  subscriptionProperties: ISubscriptionProperties;
  mercadoPagoPlanId: string;
}
