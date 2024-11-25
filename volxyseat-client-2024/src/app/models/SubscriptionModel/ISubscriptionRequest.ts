import { SubscriptionEnum } from "../Enums/SubscriptionEnum";
import { SubscriptionStatus } from "../Enums/SubscriptionStatus";
import { ISubscriptionProperties } from "../ISubscriptionProperties";

export interface ISubscriptionRequest {
    typeId: SubscriptionEnum;
    statusId: SubscriptionStatus;
    description: string;
    price: number;
    subscriptionProperties: ISubscriptionProperties;
    mercadoPagoPlanId: string;
  }